import {Injectable} from '@angular/core';
import {Coordinates} from "../model/coordinates";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface City {
  name: string
  position: Coordinates
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(protected http: HttpClient) {
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`http://localhost:8080/cities`)
  }

  getCityPosition(cityName): Observable<Coordinates> {
    return this.http.get<City>(`http://localhost:8080/cities/${cityName}`).pipe(map(city => city.position))
  }

  addCity(city: {name: string, latitude: number, longitude: number}) {
    return this.http.post<City>(`http://localhost:8080/cities`, {name: city.name, position: {latitude: city.latitude, longitude: city.longitude}})
  }
}
