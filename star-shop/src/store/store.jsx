import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducers from './slices/UsersSlice'

const reducers = combineReducers(
    {
        users: UsersReducers
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store