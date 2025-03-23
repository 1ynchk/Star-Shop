import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from './../host';

export const fetchCheckLogin = createAsyncThunk('users/fetchCheckLogin', async () => {
    const response = await axios.get(
        `${host}/api_users/check-login/`,
        {
            withCredentials: true,
        }
    )

    return response.data
})
