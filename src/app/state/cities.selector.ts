import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import citySearch from "../interfaces/citySearch.model";


export const selectCities = createSelector( (state: AppState) => state.cities, cities => cities)
export const SelectCitiesData = createSelector( (state: AppState) => state.citiesData, citiesData => citiesData)
