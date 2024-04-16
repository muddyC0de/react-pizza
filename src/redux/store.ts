import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import fullPizzaSlice from "./slices/fullPizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice, fullPizzaSlice },
});

type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
