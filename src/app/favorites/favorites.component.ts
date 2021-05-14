import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any = [];


  constructor(public weatherService:WeatherService) { }

  ngOnInit(): void {
    this.favorites =  this.weatherService.favoriteLocations
  }

  toggleTemp(){
    if(this.weatherService.metric==true){
      this.weatherService.metric=false
    }else if(this.weatherService.metric==false){

            this.weatherService.metric=true
        }
    }
  }

