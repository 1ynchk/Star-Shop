import { createSlice } from "@reduxjs/toolkit";

import { fetchGetProfileInfo } from './../requests/Users/profile-info';
import { fetchEditProfileInfo } from './../requests/Users/edit-profile-info';

const ProfileSlice = createSlice(
    {
        'name': 'profile',

        initialState: {
            profileInfo: {}
        },

        reducers: {

        },

        extraReducers: (builder) => {
           builder  
                // Profile get info
                .addCase(
                    fetchGetProfileInfo.fulfilled, (state, action) => {
                        state.profileInfo = action.payload.data
                        state.loading = false
                    }
                )
                .addCase(
                    fetchGetProfileInfo.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchGetProfileInfo.rejected, (state, action) => {
                        state.loading = false
                    }
                )

                // Profile edit info
                .addCase(
                    fetchEditProfileInfo.fulfilled, (state, action) => {
                        state.profileInfo = action.payload.data
                        state.loading = false
                    }
                )
                .addCase(
                    fetchEditProfileInfo.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchEditProfileInfo.rejected, (state, action) => {
                        state.loading = false
                    }
                ) 
        }
    }
)

export default ProfileSlice.reducer