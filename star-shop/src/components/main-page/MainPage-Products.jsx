
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";

const MainPageProducts = (props) => {

    const {
        products,
        loading,
        label
    } = props

    return (
        <div className='mainpageproducts'>
            <div className='mainpageproducts__title'>{label}</div>
            {
                !loading && (
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
                                slidesPerView: 3,
                                spaceBetween: 10,
                                slidesPerGroup: 3
                            },
                            480: {
                                slidesPerView: 3,
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
                            products.map((el, ind) => {
                                return (
                                    <SwiperSlide
                                        key={ind}
                                        className='swiper_card'>
                                        <div className='product_card_wrapper'>
                                            <div className='product_card'>
                                                <NavLink to={{
                                                    pathname: '/products/' + el.id,
                                                }}>
                                                    <div className='product_card__img_container'>
                                                        <img
                                                            className='product_card__img'
                                                            src={el.main_image}
                                                            alt='product card' />
                                                    </div>
                                                    <div className='product_card__title'>
                                                        {el.name}
                                                    </div>
                                                </NavLink>
                                                <div className='product_card__price_container'>
                                                    {el.price}
                                                </div>
                                                <div className='product_card_btns'>
                                                    <div className='product_card_btn'>
                                                        В корзину
                                                    </div>
                                                    <div className='product_btn_favorite' >
                                                        <MdFavoriteBorder />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )

                            })
                        }
                    </Swiper>
                )
            }
        </div >

    )
}

export default MainPageProducts