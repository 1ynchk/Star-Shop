import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetMainCategories = createAsyncThunk('mainpage/fetchGetMainCategories',
    async () => {
        const response = await axios.get(
            `${host}/api_main/get-main-categories/`,
            {
                withCredentials: true
            }
        )

        return response.data
    }
)