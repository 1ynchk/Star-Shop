import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";
import getCSRFToken from "../../../components/bll/get-csrf-token";

export const fetchPostAssessment = createAsyncThunk('product/fetchPostAssessment',
    async(params) => {
        const token = getCSRFToken()
        
        const response = await axios.post(
            `${host}/api_products/post-assessment/`,
            {
                type: params.type, 
                rate: params.rate, 
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