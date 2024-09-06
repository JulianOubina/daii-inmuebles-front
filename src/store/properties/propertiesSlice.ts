import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { endpoints } from "../../api/endpoints";
import api, { API_HOST } from "../../api/api";
import { Property, PropertyType, SortBy } from "../../models/property";

interface PropertyState {
  loadingProperties: boolean
  properties: Property[],
  isPropertiesError: boolean
}

const initialState: PropertyState = {
  loadingProperties: true,
  properties: [],
  isPropertiesError: false
};

export const fetchProperties = createAsyncThunk(
  "users/fetchProperties",
  async ({ sortBy, propertyType } : { sortBy?: SortBy, propertyType?: PropertyType }, { rejectWithValue }) => {
    const sortByQuery = sortBy ? `sortBy=${sortBy}` : "";
    const propertyTypeQuery = propertyType ? `propertyType=${propertyType}` : "";

    const fetchPropertiesUrl = `${API_HOST}${endpoints.properties}?${sortByQuery}${propertyTypeQuery}`;

    try{
      const response = await api.get(fetchPropertiesUrl);
      return response.data.content as Property[];
    }catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.loadingProperties = true;
      state.properties = [];
      state.isPropertiesError = false;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loadingProperties = false;
      state.isPropertiesError = false;
      state.properties = action.payload;
    });
    builder.addCase(fetchProperties.rejected, (state) => {
      state.loadingProperties = false;
      state.isPropertiesError = true;
      state.properties = [];
    });
  }
});

export const selectProperties = (state: RootState) => state.properties.properties;
export const selectLoadingProperties = (state: RootState) => state.properties.loadingProperties;
export const selectIsPropertiesError = (state: RootState) => state.properties.isPropertiesError;

export default propertiesSlice.reducer;
