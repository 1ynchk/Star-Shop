import { createSlice } from '@reduxjs/toolkit';

import { fetchGetProduct } from './../requests/Product/get-product';

const ProductSlice = createSlice(
    {
        name: 'product',

        initialState: {
            product: {}
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetProduct.fulfilled, (state, action) => {
                        state.product = action.payload.result
                    }
                )
                .addCase(
                    fetchGetProduct.rejected, (state, action) => {
                        window.location.href = '/404'
                    }
                )
        }
    }
)

export default ProductSlice.reducer