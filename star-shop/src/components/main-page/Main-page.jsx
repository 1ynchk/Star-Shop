import { useEffect, useState } from 'react'
import '../../static/css/mainpage/mainpage.css'

import Banners from "./Banners"
import MainPageProducts from './MainPage-Products'
import { fetchGetFirstSection } from '../../store/requests/MainPage/get-first-section'
import { useDispatch, useSelector } from 'react-redux'

const MainPage = (props) => {

    const {
        setSidebarLogin
    } = props

    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.users.isLogin)

    let result = useSelector(state => state.mainpage.result)
    const resultError = useSelector(state => state.mainpage.resultError)
    const resultLoading = useSelector(state => state.mainpage.resultLoading)

    useEffect(() => {
        dispatch(fetchGetFirstSection())
    }, [])

    return (
        <div className="mainpage">
            <Banners
                resultLoading={resultLoading}
                banners={result.banners}
                resultError={resultError} />
            <MainPageProducts
                resultLoading={resultLoading}
                products={result.book}
                label='Книги'
                resultError={resultError}
                setSidebarLogin={setSidebarLogin}
                dispatch={dispatch}
                isLogin={isLogin}
            />
            <MainPageProducts
                resultLoading={resultLoading}
                products={result.chancellery}
                label='Канцелярия'
                resultError={resultError}
                setSidebarLogin={setSidebarLogin}
                dispatch={dispatch}
                isLogin={isLogin}
            />
        </div>
    )
}

export default MainPage