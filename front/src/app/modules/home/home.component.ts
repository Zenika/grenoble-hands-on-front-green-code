import { Component, OnInit } from '@angular/core';
import {CitiesService, City} from "../../shared/services/cities.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities$: Observable<City[]>;

  constructor(protected citiesService: CitiesService) { }

  ngOnInit(): void {
    this.cities$ = this.citiesService.getCities();
  }

}
