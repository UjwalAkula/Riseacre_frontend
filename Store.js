import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './Redux/FiltersSlice'; // Import the filters slice reducer
import searchReducer from './Redux/SearchSlice'; // Import the search slice reducer
import postingReducer from './Redux/PostingSlice'; // Import the posting slice reducer
import appReducer from './Redux/AppSlice'; // Import the app slice reducer
import listingReducer from './Redux/ListingSlice'; // Import the listing slice reducer

// Configure the Redux store and include the filters reducer
export const store = configureStore({
  reducer: {
    search: searchReducer,    // Managing search state in Redux
    filters: filtersReducer,  // Managing filters state in Redux
    posting: postingReducer,  // Managing posting state in Redux
    app: appReducer,           // Managing app state in Redux
    listing: listingReducer,   // Managing listing state in Redux
  },
});
