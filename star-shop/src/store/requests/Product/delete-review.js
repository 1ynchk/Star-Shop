import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchReviewDelete = createAsyncThunk('product/fetchReviewDelete',
    async (params) => {
        const token = getCSRFToken()

        const response = await axios.delete(
            `${host}/api_products/delete-review/`,
            {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': token
                },
                data: {product_id: params.product_id, review_id: params.review_id}
            },
        )

        return response.data
    }
)