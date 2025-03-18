import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckLogin } from "../queries/Users/check-login";


const UsersSlice = createSlice(
    {
        name: 'users',

        initialState: {
            isLogin: false,
            loading: false
        },

        reducers: {
            setLogin(state, action) {
                state.isLogin = action.payload
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        state.isLogin = action.payload.auth
                        state.loading = false
                    }
                )
                .addCase(
                    fetchCheckLogin.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchCheckLogin.rejected, (state, action) => {
                        state.isLogin = false
                        state.loading = false
                    }
                )
        }
    }
)

export const { setLogin } = UsersSlice.actions

export default UsersSlice.reducer