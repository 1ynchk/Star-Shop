import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetFirstSection = createAsyncThunk('mainpage/fetchGetFirstSection',
    async () => {
        const response = await axios.get(
            `${host}/api_main/get-first-section/`,
            {
                withCredentials: true
            }
        )
        return response.data
    }
)