import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/WeatherApi/WeatherApiSlice"
export const store = configureStore({
    reducer : {
        data : apiReducer
    }
})