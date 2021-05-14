import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import {WeatherService} from './services/weather.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { citiesDataReducer, citiesReducer } from './state/cities.reducer';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherPageComponent,
    FavoritesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({cities:citiesReducer, citiesData:citiesDataReducer}),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
