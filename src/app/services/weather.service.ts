import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import citySearch from '../interfaces/citySearch.model';
import { Observable } from 'rxjs';
import cityLocal from '../interfaces/cityLocal.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apikey = 'nrIvSdtQh7vhMLw9HvVPG6sOqGkidzu3';

  favoriteLocations: any = [];
  metric: boolean = true;
  constructor(public http: HttpClient) {}

  getLocation(query: String): Observable<citySearch[]> {
    return this.http.get<citySearch[]>(
      `https://cors.bridged.cc/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
        this.apikey
      }&q=${query}&language=en-us`
    );
  }

  getCurrentConditions(cityKey: String): Observable<cityLocal[]> {
    return this.http.get<cityLocal[]>(
      `https://cors.bridged.cc/http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${
        this.apikey
      }&language=en-us&details=false`
    );
  }

  getForecast(cityKey: String) {
    return this.http.get<any>(
      `https://cors.bridged.cc/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${
        this.apikey
      }&language=en-us&details=details&metric=true`
    );
  }

  getUserLocation(lat: String, lon: String) {
    return this.http.get<any>(
      `https://cors.bridged.cc/http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
        this.apikey
      }&q=${lat}%2C${lon}&language=en-us&details=false&toplevel=false`
    );
  }
}
