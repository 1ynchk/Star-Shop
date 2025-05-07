import { createSlice } from '@reduxjs/toolkit';

import { fetchEditProfileInfo } from '../requests/Users/edit-profile-info';
import { fetchPostReview } from './../requests/Product/post-review';
import { fetchReviewDelete } from '../requests/Product/delete-review';
import { fetchUpdateReview } from '../requests/Product/update-review';
import { fetchAddToFavorite } from './../requests/Product/add-to-favorite';

const defineError = (state, action) => {
    let errorCode = +(action.error.message.slice(-3))
    if (errorCode == 400) {
        state.warning = 'Инкорректная форма'
    } else {
        state.warning = `Произошла ошибка ${errorCode}.`
    }
}

const WarningsSlice = createSlice(
    {
        name: 'warnings',

        initialState: {
            warning: ''
        },

        reducers: {
            clearWarning(state, action) {
                state.warning = ''
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchEditProfileInfo.rejected, (state, action) => {
                        defineError(state, action)
                    }
                )
                .addCase(
                    fetchReviewDelete.rejected, (state, action) => {
                        defineError(state, action)
                    }
                )
                .addCase(
                    fetchUpdateReview.rejected, (state, action) => {
                        defineError(state, action)
                    }
                )
                .addCase(
                    fetchAddToFavorite.rejected, (state, action) => {
                        defineError(state, action)
                    }
                )
                .addCase(
                    fetchPostReview.rejected, (state, action) => {
                        let errorCode = +(action.error.message.slice(-3))
                        if (errorCode == 400) {
                            state.warning = 'Вы не зарегестрированы!'
                        } else if (errorCode == 401) {
                            state.warning = 'Вы уже оставляли комментарий к этому продукту!'
                        } else {
                            state.warning = `Произошла ошибка ${errorCode}.`
                        }
                    }
                )
        }
    }
)

export const { clearWarning } = WarningsSlice.actions

export default WarningsSlice.reducer