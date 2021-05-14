import { createAction, props } from '@ngrx/store';

export const retrievedCities = createAction(
    '[Cities List] retrievedCities Success',
    props<{cities: any}>()
)

export const retrievedCitiesData = createAction(
    '[Cities Data List] retrievedCitiesData Success',
    props<{citiesData: any}>()
)