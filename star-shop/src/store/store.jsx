import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducers from './slices/UsersSlice'
import ProductReducers from './slices/ProductSlice'

const reducers = combineReducers(
    {
        users: UsersReducers,
        product: ProductReducers
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store