import { createSlice } from '@reduxjs/toolkit';

import { fetchGetProduct } from './../requests/Product/get-product';
import { fetchPostAssessment } from './../requests/Product/post-assessment';

const ProductSlice = createSlice(
    {
        name: 'product',

        initialState: {
            product: {},
            loading: false,
            assessments: [],
            usersRate: null
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchGetProduct.fulfilled, (state, action) => {
                        state.loading = false
                        state.product = action.payload.result
                        state.assessments = action.payload.assessments
                        if (action.payload.user_id != 'None') {
                            let usersRate = state.assessments.filter(el => (el.user.id == action.payload.user_id))
                            usersRate.length > 0 ? state.usersRate = usersRate[0].rate : state.usersRate = null
                        }
                    }
                )
                .addCase(
                    fetchGetProduct.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchGetProduct.rejected, (state, action) => {
                        state.loading = false
                        window.location.href = '/404'
                    }
                )
                .addCase(
                    fetchPostAssessment.fulfilled, (state, action) => {
                        state.assessments = action.payload.assessments
                    }
                )
        }
    }
)

export default ProductSlice.reducer