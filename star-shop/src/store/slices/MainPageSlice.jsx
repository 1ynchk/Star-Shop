import { createSlice } from '@reduxjs/toolkit';

import { fetchGetMainCategories } from './../requests/MainPage/get-main-categories';
import { fetchGetCategories } from './../requests/MainPage/get-categories';
import { fetchGetFirstSection } from './../requests/MainPage/get-first-section';
import { fetchAddToFavorite } from '../requests/Product/add-to-favorite';

const MainPageSlice = createSlice(
    {
        name: 'mainpage',

        initialState: {
            mainCategories: [],
            mainCategoriesLoading: false,
            categories: [],
            categoriesLoading: false,
            categoriesError: '',
            result: {},
            resultLoading: false,
            resultError: '',
            favoriteFetchLoading: false
        },

        reducers: {
            setCategoriesError(state, action) {
                state.categoriesError = action.payload
            }
        },

        extraReducers: (builder) => {
            builder
                // main categories
                .addCase(
                    fetchGetMainCategories.fulfilled, (state, action) => {
                        state.mainCategories = action.payload.result
                        state.mainCategoriesLoading = false
                    }
                )
                .addCase(
                    fetchGetMainCategories.pending, (state, action) => {
                        state.mainCategoriesLoading = true
                    }
                )
                .addCase(
                    fetchGetMainCategories.rejected, (state, action) => {
                        state.mainCategoriesLoading = false
                    }
                )

                // catalog sidebar
                .addCase(
                    fetchGetCategories.fulfilled, (state, action) => {
                        state.categories = action.payload.result
                        state.categoriesLoading = false
                    }
                )
                .addCase(
                    fetchGetCategories.pending, (state, action) => {
                        state.categoriesLoading = true
                    }
                )
                .addCase(
                    fetchGetCategories.rejected, (state, action) => {
                        state.categoriesLoading = false
                        let errorCode = +(action.error.message.slice(-3))
                        state.categoriesError = `${errorCode}`
                    }
                )

                // mainpage products
                .addCase(
                    fetchGetFirstSection.fulfilled, (state, action) => {
                        state.result = action.payload.result
                        state.resultLoading = false
                    }
                )
                .addCase(
                    fetchGetFirstSection.pending, (state, action) => {
                        state.resultLoading = true
                    }
                )
                .addCase(
                    fetchGetFirstSection.rejected, (state, action) => {
                        state.resultLoading = false
                        let errorCode = +(action.error.message.slice(-3))
                        state.resultError = `${errorCode}`
                    }
                )
                // add to favorites
                .addCase(
                    fetchAddToFavorite.fulfilled, (state, action) => {
                        for (let ind in state.result.book) {
                            if (state.result.book[ind].id == action.payload.product_id) {
                                if (action.payload.data == null) {
                                    state.result.book[ind].user_favorite = []
                                } else {
                                    state.result.book[ind].user_favorite = [action.payload.data]
                                }
                            }
                        }
                        for (let ind in state.result.chancellery) {
                            if (state.result.chancellery[ind].id == action.payload.product_id) {
                                if (action.payload.data == null) {
                                    state.result.chancellery[ind].user_favorite = []
                                } else {
                                    state.result.chancellery[ind].user_favorite = [action.payload.data]
                                }
                            }
                        }
                        state.favoriteFetchLoading = false
                    }
                )
                .addCase(
                    fetchAddToFavorite.pending, (state, action) => {
                        state.favoriteFetchLoading = true
                    }
                )
                .addCase(
                    fetchAddToFavorite.rejected, (state, action) => {
                        state.favoriteFetchLoading = false
                    }
                )
        }
    }
)

export const { setCategoriesError } = MainPageSlice.actions

export default MainPageSlice.reducer
