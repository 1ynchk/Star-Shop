import { createSlice } from "@reduxjs/toolkit";

import { fetchGetProfileInfo } from './../requests/Users/profile-info';
import { fetchEditProfileInfo } from './../requests/Users/edit-profile-info';
import { fetchProfile } from './../requests/Users/profile-favorite';
import { fetchAddToFavorite } from "../requests/Product/add-to-favorite";

const ProfileSlice = createSlice(
    {
        'name': 'profile',

        initialState: {
            profileInfo: {},
            infoLoading: false,
            favoriteProducts: [],
            favoriteLoading: false,
            favoriteFetchLoading: false
        },

        reducers: {

        },

        extraReducers: (builder) => {
            builder
                // Profile get info
                .addCase(
                    fetchGetProfileInfo.fulfilled, (state, action) => {
                        state.profileInfo = action.payload.data
                        state.infoLoading = false
                    }
                )
                .addCase(
                    fetchGetProfileInfo.pending, (state, action) => {
                        state.infoLoading = true
                    }
                )
                .addCase(
                    fetchGetProfileInfo.rejected, (state, action) => {
                        state.infoLoading = false
                    }
                )

                // Profile edit info
                .addCase(
                    fetchEditProfileInfo.fulfilled, (state, action) => {
                        state.profileInfo = action.payload.data
                        state.infoLoading = false
                    }
                )
                .addCase(
                    fetchEditProfileInfo.pending, (state, action) => {
                        state.infoLoading = true
                    }
                )
                .addCase(
                    fetchEditProfileInfo.rejected, (state, action) => {
                        state.infoLoading = false
                    }
                )

                // Profile favorite
                .addCase(
                    fetchProfile.fulfilled, (state, action) => {
                        state.favoriteProducts = action.payload.result.data
                        state.favoriteLoading = false
                    }
                )
                .addCase(
                    fetchProfile.pending, (state, action) => {
                        state.favoriteLoading = true
                    }
                )
                .addCase(
                    fetchProfile.rejected, (state, action) => {
                        state.favoriteLoading = false
                    }
                )

                // add to favorite btn
                .addCase(
                    fetchAddToFavorite.fulfilled, (state, action) => {
                        let arrayFavorites = JSON.parse(JSON.stringify(state.favoriteProducts))
                        console.log(arrayFavorites)
                        if (action.payload.data == null) {
                            arrayFavorites = arrayFavorites.filter(el => el.id != action.payload.product_id)
                        }
                        state.favoriteProducts = arrayFavorites
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

export default ProfileSlice.reducer