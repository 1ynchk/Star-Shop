import '../../static/css/mainpage/banners.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { fetchGetBanners } from './../../store/requests/MainPage/get-banners';

const Banners = (props) => {

    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchGetBanners({ 'setter': setBanners, 'setterLoading': setLoading })
    }, [])

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className='swiper_container'
        >
            {
                loading && (
                    <div className='loading_container empty_loading swiper_container'>
                        <div className='shiny empty_loading'></div>
                    </div>
                )
            }
            {
                !loading && banners.map((el, ind) => {
                    return (
                        <SwiperSlide
                            key={ind}
                            className='slider_container'>
                            <img className="banner_photo" src={el.image} alt='banner_photo' />
                        </SwiperSlide>
                    )
                })
            }
            <div className='swiper-button-next'>
            </div>
            <div className='swiper-button-prev'>
            </div>
        </Swiper>


    )
}

export default Banners