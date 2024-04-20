import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "./pizzaSlice";
import { CartItem } from "./cartSlice";
export type HistoryItem = {
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
  date: number;
};

interface HistorySliceState {
  historyItems: HistoryItem[];
  status: Status;
}

const initialState: HistorySliceState = {
  historyItems: [],
  status: Status.LOADING,
};

export const fetchHistory = createAsyncThunk(
  "history/fetchHistoryStatus",
  async () => {
    const { data } = await axios.get(
      `https://662125d03bf790e070b20044.mockapi.io/orders`
    );
    return data as HistoryItem[];
  }
);

export const HistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryItem(state, action: PayloadAction<CartItem[]>) {
      axios.post(
        "https://662125d03bf790e070b20044.mockapi.io/orders",
        ...action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = Status.LOADING;
        state.historyItems = [];
      })

      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.historyItems = action.payload;
        state.status = Status.SUCCESS;
      })

      .addCase(fetchHistory.rejected, (state) => {
        state.status = Status.ERROR;
        state.historyItems = [];
      });
  },
});

export const { addHistoryItem } = HistorySlice.actions;

export default HistorySlice.reducer;
