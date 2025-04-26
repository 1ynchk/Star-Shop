import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchRegister = createAsyncThunk('users/fetchRegister', async (params) => {
    const token = getCSRFToken()

    const response = await axios.post(
        `${host}/api_users/registration/`,
        {
            name: params.name,
            surname: params.surname,
            email: params.email,
            password: params.password
        },
        {
            withCredentials: true,
            headers: {
                'X-CSRFToken': token
            }
        }
    )

    return response.data
})