
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';

const MainPageProducts = (props) => {

    const [arrayProducts, setArrayProducts] = useState([])

    const {
        products,
        resultLoading,
        label,
        resultError,
        setSidebarLogin,
        dispatch,
        isLogin
    } = props


    useEffect(() => {
        products == undefined ? setArrayProducts([]) : setArrayProducts(products)
    }, [resultLoading, products])

    return (
        <div className='mainpageproducts'>
            <div className='mainpageproducts__title'>{label}</div>
            {
                !resultLoading && (
                    <Swiper
                        modules={[Navigation]}
                        grabCursor={true}
                        spaceBetween={20}
                        slidesPerView={5}
                        loop={true}
                        navigation
                        pagination
                        slidesPerGroup={5}
                        className='main_menu_swiper'
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                                slidesPerGroup: 3
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                                slidesPerGroup: 3
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                                slidesPerGroup: 3
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                                slidesPerGroup: 4
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                                slidesPerGroup: 5
                            }
                        }}
                    >
                        {
                            arrayProducts.map((el, ind) => {
                                return (
                                    <SwiperSlide
                                        key={ind}
                                        className='swiper_card'>
                                        <ProductCard
                                            product_id={el.id}
                                            content_type={el.content_type}
                                            main_image={el.main_image}
                                            name={el.name}
                                            author={el.author}
                                            price={el.price}
                                            discount={el.discount}
                                            isLogin={isLogin}
                                            setSidebarLogin={setSidebarLogin}
                                            dispatch={dispatch}
                                            product={el}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                )
            }
            {
                resultError.length != 0 && (
                    <div className='mainpageproducts__error'>
                        {resultError}
                    </div>
                )
            }

        </div >

    )
}

export default MainPageProducts