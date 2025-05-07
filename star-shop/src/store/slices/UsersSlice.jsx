import { createSlice } from "@reduxjs/toolkit";

import { fetchCheckLogin } from "../requests/Users/check-login";
import { fetchRegister } from "../requests/Users/register";
import { fetchLogin } from './../requests/Users/login';
import { fetchLogout } from "../requests/Users/logout";

const UsersSlice = createSlice(
    {
        name: 'users',

        initialState: {
            isLogin: false,
            loading: false,
            checkLoginLoading: true,
            registrationError: '',
            loginError: '',
            isRegistred: false,
            screenLoading: false,
            userId: null
        },

        reducers: {
            setLogin(state, action) {
                state.isLogin = action.payload
            },

            clearState(state, action) {
                state.isLogin = false
                state.loading = false
                state.registrationError = ''
                state.isRegistred = false
                state.loginError = ''
                state.checkLoginLoading = false
            }
        },

        extraReducers: (builder) => {
            builder
                // Check login
                .addCase(
                    fetchCheckLogin.fulfilled, (state, action) => {
                        state.isLogin = action.payload.auth
                        state.userId = action.payload.user_id
                        state.checkLoginLoading = false
                    }
                )
                .addCase(
                    fetchCheckLogin.pending, (state, action) => {
                        state.checkLoginLoading = true
                    }
                )
                .addCase(
                    fetchCheckLogin.rejected, (state, action) => {
                        state.isLogin = false
                        state.checkLoginLoading = false
                    }
                )

                // Registration
                .addCase(
                    fetchRegister.fulfilled, (state, action) => {
                        state.loading = false
                        state.isRegistred = true
                    }
                )
                .addCase(
                    fetchRegister.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchRegister.rejected, (state, action) => {
                        state.loading = false
                        let errorCode = +(action.error.message.slice(-3))
                        if (errorCode == 401) {
                            state.registrationError = 'Аккаунт с такой почтой уже существует.'
                        } else {
                            state.registrationError = `Произошла ошибка ${errorCode}.`
                        }
                    }
                )

                // Login
                .addCase(
                    fetchLogin.fulfilled, (state, action) => {
                        window.location.reload()
                    }
                )
                .addCase(
                    fetchLogin.pending, (state, action) => {
                        state.loading = true
                    }
                )
                .addCase(
                    fetchLogin.rejected, (state, action) => {
                        state.loading = false
                        let errorCode = +(action.error.message.slice(-3))
                        if (errorCode == 400) {
                            state.loginError = 'Инкорректная форма'
                        } else {
                            state.loginError = `Произошла ошибка ${errorCode}.`
                        }
                    }
                )

                // Logout
                .addCase(
                    fetchLogout.fulfilled, (state, action) => {
                        window.location.reload()
                    }
                )
                .addCase(
                    fetchLogout.pending, (state, action) => {
                        state.screenLoading = true
                    }
                )
                .addCase(
                    fetchLogout.rejected, (state, action) => {
                        window.location.reload()
                    }
                )
        }
    }
)

export const { setLogin, clearState } = UsersSlice.actions

export default UsersSlice.reducer