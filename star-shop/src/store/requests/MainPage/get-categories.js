import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetCategories = createAsyncThunk('mainpage/fetchGetCategories',
    async () => {
        const response = await axios.get(
            `${host}/api_products/get-categories/`,
            {
                withCredentials: true
            }
        )
        return response.data
    }
)