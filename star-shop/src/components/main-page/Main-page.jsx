import { useEffect, useState } from 'react'
import '../../static/css/mainpage/mainpage.css'

import Banners from "./Banners"
import MainPageProducts from './MainPage-Products'
import { fetchGetFirstSection } from '../../store/requests/MainPage/get-first-section'

const MainPage = (props) => {

    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchGetFirstSection({
            'setter': setResult,
            'setterLoading': setLoading,
            'setterError': setError
        })
    }, [])

    return (
        <div className="mainpage">
            <Banners loading={loading} banners={result.banners} error={error} />
            <MainPageProducts
                loading={loading}
                products={result.books}
                label='Книги'
                error={error}
            />
            <MainPageProducts
                loading={loading}
                products={result.chancellery}
                label='Канцелярия'
                error={error}
            />
        </div>
    )
}

export default MainPage