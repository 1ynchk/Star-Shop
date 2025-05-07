import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchProfile = createAsyncThunk('users/fetchProfile', 
    async () => {
        const response = await axios.get(
            `${host}/api_profile/favorite-list/`,
            {
                withCredentials: true
            }
        )
        return response.data
    }
)