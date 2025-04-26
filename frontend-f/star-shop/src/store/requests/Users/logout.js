import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchLogout = createAsyncThunk('users/fetchLogout', async () => {
    const token = getCSRFToken()
    
    const response = await axios.post(
        `${host}/api_users/logout/`,
        {},
        {
            withCredentials: true,
            headers: {
                'X-CSRFToken': token
            }
        }
    )

    return response
})