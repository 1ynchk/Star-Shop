import { createSlice } from '@reduxjs/toolkit';

import { fetchGetProduct } from './../requests/Product/get-product';
import { fetchPostAssessment } from './../requests/Product/post-assessment';
import { fetchPostReview } from './../requests/Product/post-review';
import { fetchReviewDelete } from './../requests/Product/delete-review';
import { fetchUpdateReview } from './../requests/Product/update-review';

const ProductSlice = createSlice(
    {
        name: 'product',

        initialState: {
            product: {},
            loading: false,
            assessments: [],
            usersRate: 'null',
            reviews: [],
            reviewsLoading: false,
            reviewUpdateLoading: false,
            isReviewChanged: null
        },

        reducers: {
            setReviewChanged(state, action) {
                state.isReviewChanged = null
            }
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
                        console.log(state.reviews)
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
                .addCase(
                    fetchReviewDelete.fulfilled, (state, action) => {
                        state.reviews = state.reviews.filter(el => (el.id != action.payload.review_id))
                    }
                )
                .addCase(
                    fetchUpdateReview.fulfilled, (state, action) => {
                        state.reviewUpdateLoading = false
                        for (let i in state.reviews) {
                            if (state.reviews[i].id == action.payload.review.id) {
                                state.reviews[i].review = action.payload.review.review
                                state.isReviewChanged = true
                            }
                        }
                    }
                )
                .addCase(
                    fetchUpdateReview.pending, (state, action) => {
                        state.reviewUpdateLoading = true
                    }
                )
                .addCase(
                    fetchUpdateReview.rejected, (state, action) => {
                        state.fetchUpdateReview = false
                        state.isReviewChanged = false
                    }
                )
        }
    }
)

export const { setReviewChanged } = ProductSlice.actions

export default ProductSlice.reducer