import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetProfileInfo = createAsyncThunk('users/fetchGetProfileInfo', 
    async () => {
        const response = await axios.get(
            `${host}/api_users/profile/get-profile-info/`, 
            {
                withCredentials: true
            }
        )

        return response.data
    }
)