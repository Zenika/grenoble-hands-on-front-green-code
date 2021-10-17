import {Injectable} from '@angular/core';
import {Coordinates} from "../model/coordinates";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {WeatherService} from "./weather.service";
import {City} from "../model/city";
import {CityWithWeather} from "../model/city-with-weather";

@Injectable({
    providedIn: 'root'
})
export class CitiesService {

    constructor(protected http: HttpClient, private weatherService: WeatherService) {
    }

    getCities(): Observable<CityWithWeather[]> {
        return this.http.get<City[]>(`http://localhost:8080/cities`)
            .pipe(
                mergeMap((cities) => {
                    return forkJoin(cities.map(city => this.weatherService.getCityDetailedWeather(city.name).pipe(
                        map(weather => ({
                            ...city,
                            weather: weather[0]
                        }))
                    )))
                })
            )
    }

    getCityPosition(cityName): Observable<Coordinates> {
        return this.http.get<City>(`http://localhost:8080/cities/${cityName}`).pipe(map(city => city.position))
    }

    addCity(city: { name: string, latitude: number, longitude: number }) {
        return this.http.post<City>(`http://localhost:8080/cities`, {
            name: city.name,
            position: {latitude: city.latitude, longitude: city.longitude}
        })
    }
}
