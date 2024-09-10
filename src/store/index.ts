import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties/propertiesSlice";
import rentalsReducer from "./properties/rentalsSlice";
import districtsReducer from "./properties/districtsSlice";
import propertyDetailsReducer from "./properties/propertyDetailsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    propertyDetails: propertyDetailsReducer,
    rentals: rentalsReducer,
    districts: districtsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
