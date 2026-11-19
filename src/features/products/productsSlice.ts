import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product, RequestStatus } from '../../types';
import type { RootState } from '../../app/store';

interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      return rejectWithValue(`Không thể tải sản phẩm (HTTP ${response.status})`);
    }
    const data = (await response.json()) as Product[];
    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Lỗi kết nối mạng không xác định';
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Đã xảy ra lỗi';
      });
  },
});

export const selectAllProducts = (state: RootState): Product[] => state.products.items;
export const selectProductsStatus = (state: RootState): RequestStatus => state.products.status;
export const selectProductsError = (state: RootState): string | null => state.products.error;

export default productsSlice.reducer;