import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './Redux/FiltersSlice'; // Import the filters slice reducer
import searchReducer from './Redux/SearchSlice'; // Import the search slice reducer

// Configure the Redux store and include the filters reducer
export const store = configureStore({
  reducer: {
    search: searchReducer,    // Managing search state in Redux
    filters: filtersReducer,  // Managing filters state in Redux
  },
});
