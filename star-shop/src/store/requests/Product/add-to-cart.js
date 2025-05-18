import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchAddToCart = createAsyncThunk('product/fetchAddToCart', 
    async(params) => {
        const token = getCSRFToken()
        
        const response = await axios.post(
            `${host}/api_cart/add-to-cart/`,
            {
                product_id: params.product_id,
                type: params.type
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