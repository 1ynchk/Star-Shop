import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { host } from "../host";

export const fetchGetProduct = createAsyncThunk('product/fetchGetProduct',
    async (params) => {
        const response = await axios.get(
            `${host}/api_products/get-product/`,
            { 
                withCredentials: true,
                params: {
                    id: params.id,
                    type: params.type
                } 
            }
        )

        return response.data
    })