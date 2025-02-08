import { createSlice } from '@reduxjs/toolkit';

// Initial state for the filters
const initialState = {
  purpose: '',
  category: '',
  propertyType: '',
  bhkType: '',
  status: '',
  price: '',
  buildUpArea: ''
};

// Create the slice for filters
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setBhkType: (state, action) => {
      state.bhkType = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setBuildUpArea: (state, action) => {
      state.buildUpArea = action.payload;
    },
    clearFilters: (state) => {
      state.purpose = '';
      state.category = '';
      state.propertyType = '';
      state.bhkType = '';
      state.status = '';
      state.price = '';
      state.buildUpArea = '';
    }
  }
});

// Export actions
export const {
  setPurpose,
  setCategory,
  setPropertyType,
  setBhkType,
  setStatus,
  setPrice,
  setBuildUpArea,
  clearFilters
} = filtersSlice.actions;

// Export the reducer to be used in the store
export default filtersSlice.reducer;
