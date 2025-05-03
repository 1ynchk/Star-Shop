import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetNextPage = createAsyncThunk('product/fetchGetNextPage', 
    async (params) => {

        let url = params.next_page
        
        const response = await axios.get(
            url,
            {
                withCredentials: true
            }
        )
        return response.data
    }
)