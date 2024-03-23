import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import { favourites, favouritesReducer } from "./slices/favouritesSlice";
import { data, dataReducer } from "./slices/dataSlice";
import { cityName, cityReducer } from "./slices/citySlice";



const store = createStore(combineReducers(
    {
        city: cityReducer,
        data: dataReducer,
        favourites: favouritesReducer
    }), {
    city: cityName,
    favourites,
    data: data
}, applyMiddleware(thunk))
export default store;