import { configureStore, combineReducers } from '@reduxjs/toolkit'

import UsersReducers from './slices/UsersSlice'
import ProductReducers from './slices/ProductSlice'
import WarningsReducers from './slices/WarningsSlice'
import ProfileReducers from './slices/ProfileSlice'
import MainPageReducers from './slices/MainPageSlice'

const reducers = combineReducers(
    {
        users: UsersReducers,
        product: ProductReducers,
        warnings: WarningsReducers,
        profile: ProfileReducers,
        mainpage: MainPageReducers
    }
)

const store = configureStore(
    {
        reducer: reducers
    }
)

export default store