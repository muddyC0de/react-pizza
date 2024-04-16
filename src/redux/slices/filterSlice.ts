import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CurrentSort = {
  name: string;
  sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

interface FilterSliceState {
  currentCategory: number;
  currentPage: number;
  currentSort: CurrentSort;

  searchValue: string;
}

const initialState: FilterSliceState = {
  currentCategory: 0,
  currentPage: 1,
  currentSort: {
    name: "популярности (DESC)",
    sortProperty: "rating",
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<number>) {
      state.currentCategory = action.payload;
    },

    setCurrentSort(state, action: PayloadAction<CurrentSort>) {
      state.currentSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCurrentCategory,
  setCurrentSort,
  setCurrentPage,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
