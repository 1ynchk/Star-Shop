import { createSlice } from '@reduxjs/toolkit';

import { fetchGetMainCategories } from './../requests/MainPage/get-main-categories';
import { fetchGetCategories } from './../requests/MainPage/get-categories';
import { fetchGetFirstSection } from './../requests/MainPage/get-first-section';

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
            resultError: ''
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

                        if (state.result?.favorite?.length) {
                            const favoritesMap = {};
                            state.result.favorite.forEach(fav => {
                                if (fav?.object_id) favoritesMap[fav.object_id] = fav
                            })

                            if (state.result.book?.length) {
                                state.result.book = state.result.book.map(book => {
                                    if (!book || typeof book !== 'object') return book
                                    return favoritesMap[book.id]
                                        ? { ...book, favorite: favoritesMap[book.id] }
                                        : book
                                })
                            }
                            if (state.result.chancellery?.length) {
                                state.result.chancellery = state.result.chancellery.map(book => {
                                    if (!book || typeof book !== 'object') return book
                                    return favoritesMap[book.id]
                                        ? { ...book, favorite: favoritesMap[book.id] }
                                        : book
                                })
                            }
                        }
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
        }
    }
)

export const { setCategoriesError } = MainPageSlice.actions

export default MainPageSlice.reducer
