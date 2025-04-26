import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchLogin = createAsyncThunk('users/fetchLogin', async (params) => {
    const token = getCSRFToken()

    const response = await axios.post(
        `${host}/api_users/login/`,
        {'email': params.email, 'password': params.password},
        {
            withCredentials: true,
            headers: {
                'X-CSRFToken': token
            }
        }
    )

    return response.data
})