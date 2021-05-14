import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherPageComponent} from './weather-page/weather-page.component'
import {FavoritesComponent} from './favorites/favorites.component'

const routes: Routes = [
  {path:'', component:WeatherPageComponent},
  {path:'favorites', component:FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
