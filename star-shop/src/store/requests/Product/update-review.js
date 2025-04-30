import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchUpdateReview = createAsyncThunk('products/fetchUpdateReview',
    async (params) => {
        const token = getCSRFToken()

        const response = await axios.put(
            `${host}/api_products/update-review/`,
            {
                product_id: params.product_id,
                review_id: params.review_id,
                review: params.review
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