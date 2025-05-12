import { createSlice } from '@reduxjs/toolkit';

import { fetchGetProduct } from './../requests/Product/get-product';
import { fetchPostAssessment } from './../requests/Product/post-assessment';
import { fetchPostReview } from './../requests/Product/post-review';
import { fetchReviewDelete } from './../requests/Product/delete-review';
import { fetchUpdateReview } from './../requests/Product/update-review';
import { fetchGetNextPage } from './../requests/Product/get-next-page';
import { fetchAddToFavorite } from './../requests/Product/add-to-favorite';
import { fetchCheckLogin } from './../requests/Users/check-login';
import { host } from '../requests/host';

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
            isReviewChanged: null,
            nextPageReviews: null,
            nextPageLoading: false,
            isFavorite: null,
            userId: null
        },

        reducers: {
            setReviewChanged(state, action) {
                state.isReviewChanged = null
            },
            clearState(state, action) {
                state.product = []
                state.loading = false
                state.assessments = []
                state.usersRate = 'null'
                state.reviews = []
                state.reviewsLoading = false
                state.reviewUpdateLoading = false
                state.isReviewChanged = null
                state.nextPageReviews = null
                state.nextPageLoading = false
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        state.userId = action.payload.user_id
                    }
                )
                .addCase(
                    fetchGetProduct.fulfilled, (state, action) => {
                        state.loading = false
                        state.product = action.payload.result
                        state.assessments = action.payload.assessments
                        state.reviews = action.payload.reviews.results
                        state.isFavorite = action.payload.result.user_favorite[0]

                        if (action.payload.reviews.next != null) {
                            state.nextPageReviews = `${host}/api_products/paginated-reviews?product_id=${action.payload.result.id}&page=2`
                        }
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
                                state.reviews[i].is_changed = true
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
                .addCase(
                    fetchGetNextPage.fulfilled, (state, action) => {
                        state.nextPageLoading = false
                        state.nextPageReviews = action.payload.next
                        state.reviews = state.reviews.concat(action.payload.data.results)
                    }
                )
                .addCase(
                    fetchGetNextPage.pending, (state, action) => {
                        state.nextPageLoading = true
                    }
                )
                .addCase(
                    fetchGetNextPage.rejected, (state, action) => {
                        state.nextPageLoading = false
                    }
                )
                .addCase(
                    fetchAddToFavorite.fulfilled, (state, action) => {
                        state.isFavorite = action.payload.data
                    }
                )
        }
    }
)

export const { setReviewChanged, clearState } = ProductSlice.actions

export default ProductSlice.reducer