import { Component, OnInit } from '@angular/core';
import citySearch from '../interfaces/citySearch.model';
import { WeatherService } from '../services/weather.service';
import cityLocal from '../interfaces/cityLocal.model';
import forecast from '../interfaces/forecast.mode';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  favoriteLocations: any = [];
  likedCity: any;
  addMsg = '';
  removeMsg = '';
  metric = true;
  citySearch: citySearch[] = [];
  cityLocal: cityLocal[] = [];
  Forecast: any = {};

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  setLikedCity(index: any) {
    this.likedCity = index;
  }

  getLocation() {
    let query = (<HTMLInputElement>document.getElementById('getCity')).value;
    console.log(query);
    this.weatherService
      .getLocation(query)
      .subscribe((data: citySearch[] = []) => {
        this.citySearch = data;
        console.log('this.citySearch:', this.citySearch);
        if (this.citySearch.length == 0) {
          console.log(this.citySearch.length);
          this.Forecast.DailyForecasts = null;
          console.log(this.Forecast.DailyForecasts);
        }
        for (let i = 0; i < this.citySearch.length; i++) {
          this.weatherService
            .getCurrentConditions(this.citySearch[i].Key)
            .subscribe((data: cityLocal[] = []) => {
              console.log('here i call', this.citySearch[0], data.length);

              this.cityLocal = data;
              console.log(`this.citySearch${i}`, this.cityLocal);
            });
          this.weatherService
            .getForecast(this.citySearch[i].Key)
            .subscribe(data => {
              this.Forecast = data;
              console.log(this.Forecast);
            });
        }
      });
  }

  getUserLocation() {
    const successCallBack = (position: any) => {
      console.log(
        'successCallBack:',
        position.coords.latitude.toString(),
        position.coords.longitude.toString()
      );
      this.weatherService
        .getUserLocation(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        )
        .subscribe(data => {
          this.citySearch[0] = data;
          console.log('this.citySearch:', this.citySearch);
          for (let i = 0; i < this.citySearch.length; i++) {
            this.weatherService
              .getCurrentConditions(this.citySearch[i].Key)
              .subscribe(data => {
                this.cityLocal = data;
                console.log('this.cityLocal', this.cityLocal);
              });
            this.weatherService
              .getForecast(this.citySearch[i].Key)
              .subscribe(data => {
                this.Forecast = data;
                console.log('this.Forecast:', this.Forecast);
              });
          }
        });
    };
    const errorCallback = (error: any) => {
      console.error(error);
      this.weatherService
        .getLocation('tel aviv')
        .subscribe((data: citySearch[] = []) => {
          this.citySearch = data;
          if (this.citySearch.length == 0) {
            this.Forecast.DailyForecasts = null;
          }
          for (let i = 0; i < this.citySearch.length; i++) {
            this.weatherService
              .getCurrentConditions(this.citySearch[i].Key)
              .subscribe((data: cityLocal[] = []) => {
                console.log('here i call', i, data.length);
                this.cityLocal = data;
              });
            this.weatherService
              .getForecast(this.citySearch[i].Key)
              .subscribe(data => {
                this.Forecast = data;
              });
          }
        });
    };
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallback, {
      enableHighAccuracy: true
    });
  }

  isLikedCity(key: string): boolean {
    let result = false;
    const idx: number = this.favoriteLocations.findIndex(
      (x: { name: { [x: string]: string } }) => x.name['Key'] === key
    );
    result = idx == -1 ? false : true;
    return result;
  }

  addToFav(name: any, local: any) {
    let favCity = {
      name: name,
      local: local
    };
    console.log('local:', local, 'name:', name);
    console.log('this.favoriteLocations:', this.favoriteLocations);

    if (this.favoriteLocations.length == 0) {
      this.favoriteLocations.push(favCity);
      console.log('this.favoriteLocations:', this.favoriteLocations);
      console.log('ADDED');
      this.addMsg = 'Location was added to favorites!';
      this.removeMsg = '';
    } else if (this.favoriteLocations.length > 0) {
      let index;
      for (let i = 0; i < this.favoriteLocations.length; i++) {
        if (this.favoriteLocations[i].name.Key == favCity.name.Key) {
          index = i;
        }
      }

      if (index != null) {
        this.favoriteLocations.splice(index, 1);
        this.likedCity = '';
        console.log('REMOVED');
        this.addMsg = '';
        this.removeMsg = 'Location was removed from favorites!';
      } else {
        this.favoriteLocations.push(favCity);
        console.log('ADDED');
        this.addMsg = 'Location was added to favorites!';
        this.removeMsg = '';
      }
      console.log('this.favoriteLocations:', this.favoriteLocations);
    }
    this.weatherService.favoriteLocations = this.favoriteLocations;
  }

  openModal(): void {
    let modal = <HTMLInputElement>document.getElementById('myModal');
    modal.style.display = 'block';
  }
  closeModal() {
    let modal = <HTMLInputElement>document.getElementById('myModal');
    modal.style.display = 'none';
  }
  toggleTemp() {
    if (this.weatherService.metric == true) {
      for (let i = 0; i < this.Forecast.DailyForecasts.length; i++) {
        this.Forecast.DailyForecasts[i].Temperature.Maximum.Value =
          this.Forecast.DailyForecasts[i].Temperature.Maximum.Value * 1.8 + 32;
        this.Forecast.DailyForecasts[i].Temperature.Minimum.Value =
          this.Forecast.DailyForecasts[i].Temperature.Minimum.Value * 1.8 + 32;
        this.weatherService.metric = false;
      }
    } else if (this.weatherService.metric == false) {
      for (let i = 0; i < this.Forecast.DailyForecasts.length; i++) {
        this.Forecast.DailyForecasts[i].Temperature.Maximum.Value =
          (this.Forecast.DailyForecasts[i].Temperature.Maximum.Value - 32) /
          1.8;
        this.Forecast.DailyForecasts[i].Temperature.Minimum.Value =
          (this.Forecast.DailyForecasts[i].Temperature.Minimum.Value - 32) /
          1.8;
        this.weatherService.metric = true;
      }
    }
  }
}
