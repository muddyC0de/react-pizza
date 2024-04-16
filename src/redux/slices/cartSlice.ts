import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
export type CartItem = {
  id: number;
  newId: string;
  title: string;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  price: number;
  description: string;
  supplements: string[];
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      action.payload.newId = `${action.payload.id}&${action.payload.type}&${
        action.payload.size
      }&${action.payload.supplements.join("&")}`;
      const findItem = state.items.find(
        (obj: { newId: string }) => obj.newId === action.payload.newId
      );

      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },

    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.newId === action.payload);
      if (findItem) {
        findItem.count += 1;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.newId === action.payload);

      if (findItem) {
        findItem.count -= 1;
        state.totalPrice = state.items.reduce(
          (sum, obj) => obj.price * obj.count + sum,
          0
        );
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.newId !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
