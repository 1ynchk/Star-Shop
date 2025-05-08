import '../../static/css/mainpage/banners.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination } from 'swiper/modules'

const Banners = (props) => {

    const {
        banners,
        loading,
        resultError
    } = props

    return (
        <>
            {
                !loading ? (
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
                            !loading 
                            && banners != undefined 
                            && banners.map((el, ind) => {
                                return (
                                    <SwiperSlide
                                        key={ind}
                                        className='slider_container'>
                                        <img className="banner_photo" src={el.image} alt='banner_photo' />
                                    </SwiperSlide>
                                )
                            })
                        }
                        {
                            resultError.length != 0 && (
                                <div className='error_container_banner swiper_container'>
                                    <div>При загрузке возникла ошибка {resultError}</div>
                                </div>
                            )
                        }
                        <div className='swiper-button-next'>
                        </div>
                        <div className='swiper-button-prev'>
                        </div>
                    </Swiper>
                ) : (
                    <div className='loading_container empty_loading swiper_container'>
                        <div className='shiny empty_loading'></div>
                    </div>
                )
            }

        </>



    )
}

export default Banners