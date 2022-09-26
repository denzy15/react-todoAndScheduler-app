import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: [],
  },
  reducers: {
    addToFilter(state, action) {
      state.filters.push(action.payload.filterName);
    },
    removeFromFilter(state, action) {
      state.filters = state.filters.filter(
        (item) => item !== action.payload.filterName
      );
    },
  },
});

export const { addToFilter, removeFromFilter } = filterSlice.actions;

export default filterSlice.reducer;
