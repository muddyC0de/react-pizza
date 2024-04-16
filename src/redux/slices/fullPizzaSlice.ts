import { createSlice } from "@reduxjs/toolkit";

interface FullPizzaState {
  selectedSupplements: string[];
  totalSupplementsPrice: number;
  currentType: string;
  currentSize: number;
}

const initialState: FullPizzaState = {
  selectedSupplements: [],
  totalSupplementsPrice: 0,
  currentType: "тонкое",
  currentSize: 26,
};

export const fullPizzaSlice = createSlice({
  name: "fullPizza",
  initialState,
  reducers: {
    setSelectedSupplements(state, action) {
      if (state.selectedSupplements.find((elem) => elem === action.payload)) {
        state.selectedSupplements = state.selectedSupplements.filter(
          (elem) => elem !== action.payload
        );
      } else {
        state.selectedSupplements = [
          ...state.selectedSupplements,
          action.payload,
        ];
      }
    },
    addSupplement(state, action) {
      if (
        state.selectedSupplements.find((elem) => elem === action.payload.title)
      ) {
        state.totalSupplementsPrice -= action.payload.price;
      } else {
        state.totalSupplementsPrice += action.payload.price;
      }
    },

    setCurrentType(state, action) {
      state.currentType = action.payload;
    },
    setCurrentSize(state, action) {
      state.currentSize = action.payload;
    },

    clearSelectedSupplements(state) {
      state.selectedSupplements = [];
      state.totalSupplementsPrice = 0;
    },
  },
});

export const {
  setSelectedSupplements,
  setCurrentType,
  setCurrentSize,
  clearSelectedSupplements,
  addSupplement,
} = fullPizzaSlice.actions;

export default fullPizzaSlice.reducer;
