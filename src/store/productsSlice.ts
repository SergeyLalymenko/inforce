import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProducts as fetchProductsService,
    createProduct as createProductService,
    deleteProduct as deleteProductService,
    type productToCreateType,
} from '@/services/productsService.ts';
import type { ProductType } from '@/services/productsService.ts';

type StateType = {
    isLoading: boolean;
    isLoadingError: boolean;
    products: ProductType[];
};

export const fetchProducts = createAsyncThunk<ProductType[]>(
    'products/fetchProducts',
    async function (_, { rejectWithValue }) {
        const res = await fetchProductsService();
        if (!res.ok) {
            return rejectWithValue('');
        }
        return res.products;
    }
);

export const createProduct = createAsyncThunk<ProductType, productToCreateType>(
    'products/createProduct',
    async function (productToCreate, { rejectWithValue }) {
        const res = await createProductService(productToCreate);
        if (!res.ok) {
            return rejectWithValue('');
        }
        return res.product;
    }
);

export const deleteProduct = createAsyncThunk<string, string>(
    'products/deleteProduct',
    async function (productId, { rejectWithValue }) {
        const res = await deleteProductService(productId);
        if (!res.ok) {
            return rejectWithValue('');
        }
        return res.productId;
    }
);

const initialState: StateType = {
    isLoading: false,
    isLoadingError: false,
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isLoadingError = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.isLoadingError = true;
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.products = [...state.products, action.payload];
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.products = state.products.filter(({ id }) => id !== action.payload);
            });
    },
});

export default productsSlice.reducer;
