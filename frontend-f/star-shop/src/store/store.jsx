import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducers from './slices/UsersSlice'
import ProductReducers from './slices/ProductSlice'
import WarningsReducers from './slices/WarningsSlice'

const reducers = combineReducers(
    {
        users: UsersReducers,
        product: ProductReducers,
        warnings: WarningsReducers
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store