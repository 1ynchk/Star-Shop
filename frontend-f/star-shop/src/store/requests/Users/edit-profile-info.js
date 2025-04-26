import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { host } from '../host';
import getCSRFToken from '../../../components/bll/get-csrf-token';

export const fetchEditProfileInfo = createAsyncThunk('users/fetchEditProfileInfo',
    async (data) => {
        const token = getCSRFToken()

        const response = await axios.post(
            `${host}/api_users/profile/edit-profile-info/`,
            data,
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