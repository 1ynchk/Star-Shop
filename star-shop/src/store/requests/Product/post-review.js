import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchPostReview = createAsyncThunk('product/fetchPostReview', 
    async (params) => {
        const token = getCSRFToken()

        const response = await axios.post(
            `${host}/api_products/post-review/`,
            {
                value: params.value,
                product_id: params.product_id
            },
            {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': token
                }
            }
        )

        return response.data
    }
)