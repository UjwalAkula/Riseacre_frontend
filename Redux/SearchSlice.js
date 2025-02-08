import { createSlice } from '@reduxjs/toolkit';

// Initial state for the search filter
const initialState = {
  searchString: '',
};

// Create the slice for search
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    }
  }
});

// Export the action creator
export const { setSearchString } = searchSlice.actions;

// Export the reducer for the store
export default searchSlice.reducer;
