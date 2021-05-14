import  citySearch  from '../interfaces/citySearch.model'
import cityData from '../interfaces/citySearch.model'

export interface AppState {
  cities: ReadonlyArray<citySearch>;
  citiesData: ReadonlyArray<cityData>;
  }