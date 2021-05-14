import { createReducer, on, Action } from '@ngrx/store';

import { retrievedCities } from './cities.actions';
import { retrievedCitiesData } from './cities.actions';

import citySearch from '../interfaces/citySearch.model'
import cityData from '../interfaces/cityLocal.model'


export const initialState: ReadonlyArray<citySearch> = [];
export const initialState2: ReadonlyArray<cityData> = [];

export const citiesReducer = createReducer(
    initialState,
    on(retrievedCities, (state, { cities }) => [...cities])
   
  );

  export const citiesDataReducer = createReducer(
    initialState2,
    on(retrievedCitiesData, (state, { citiesData }) => [...citiesData])
   
  );

  