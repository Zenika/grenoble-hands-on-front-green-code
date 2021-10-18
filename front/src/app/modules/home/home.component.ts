import {Component, OnInit} from '@angular/core';
import {CitiesService} from "../../shared/services/cities.service";
import {Observable} from "rxjs";
import {City} from "../../shared/model/city";
import {CityWithWeather} from "../../shared/model/city-with-weather";
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
            query(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                stagger(175, [
                    animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
                ])
            ])
        ]
    )
]);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {

    cities$: Observable<CityWithWeather[]>;

    constructor(protected citiesService: CitiesService) {
    }

    ngOnInit(): void {
        this.cities$ = this.citiesService.getCities();
    }

}
