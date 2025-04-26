import { createSlice } from '@reduxjs/toolkit';

import { fetchGetProduct } from '../requests/Product/get-product';
import { fetchPostAssessment } from '../requests/Product/post-assessment';
import { fetchPostReview } from '../requests/Product/post-review';

const ProductSlice = createSlice(
    {
        name: 'product',

        initialState: {
            product: {},
            loading: false,
            assessments: [],
            usersRate: 'null',
            reviews: [],
            reviewsLoading: false
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
                        state.reviews = action.payload.reviews
                        if (action.payload.user_id != 'None') {
                            let usersRate = state.assessments.filter(el => (el.user.id == action.payload.user_id))
                            usersRate.length > 0 ? state.usersRate = usersRate[0].rate : state.usersRate = 'null'
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
                        let usersRate = state.assessments.filter(el => (el.user.id == action.payload.user_id))
                        usersRate.length > 0 ? state.usersRate = usersRate[0].rate : state.usersRate = 'null'
                    }
                )
                .addCase(
                    fetchPostReview.fulfilled, (state, action) => {
                        state.reviewsLoading = false
                        state.reviews.unshift(action.payload.review)
                        console.log(state.reviews)
                    }
                )
                .addCase(
                    fetchPostReview.pending, (state, action) => {
                        state.reviewsLoading = true
                    }
                )
                .addCase(
                    fetchPostReview.rejected, (state, action) => {
                        state.reviewsLoading = false 
                    }
                )
        }
    }
)

export default ProductSlice.reducer