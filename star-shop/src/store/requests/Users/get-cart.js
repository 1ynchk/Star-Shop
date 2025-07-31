import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { host } from "../host";

export const fetchGetCart = createAsyncThunk(
    'users/fetchGetCart', 
    async () => {
        const response = await axios.get(
            `${host}/api_cart/get-user-cart/`,
            {
                withCredentials: true
            }
        )

        return response.data
    }
)