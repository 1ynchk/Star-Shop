
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { NavLink } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { useEffect, useState } from 'react';

const MainPageProducts = (props) => {

    const [arrayProducts, setArrayProducts] = useState([])

    const {
        products,
        loading,
        label,
        error
    } = props


    useEffect(() => {
        products == undefined ? setArrayProducts([]) : setArrayProducts(products)
    }, [loading])

    console.log(products)

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
                            arrayProducts.map((el, ind) => {
                                return (
                                    <SwiperSlide
                                        key={ind}
                                        className='swiper_card'>
                                        <div className='product_card_wrapper'>
                                            <div className='product_card'>
                                                <NavLink to={{
                                                    pathname: '/products/' + el.id,
                                                    search: '?type=' + el.content_type
                                                }}>
                                                    <div className='product_card__img_container'>
                                                        <img
                                                            className='product_card__img'
                                                            src={el.main_image}
                                                            alt='product card' />
                                                    </div>
                                                    <div className='product_card__title'>
                                                        {el.name.length < 50 ? el.name : `${el.name.slice(0, 50)}...`}
                                                    </div>
                                                    {
                                                        el.content_type == 'book' && (
                                                            <div className='product_card_author'>
                                                                {el.author.name}
                                                            </div>
                                                        )
                                                    }

                                                </NavLink>
                                                {
                                                    el.discount == null && (
                                                        <div className='product_card__price_container'>
                                                            {el.price} &#8381;
                                                        </div>
                                                    )
                                                }
                                                {
                                                    el.discount != null && (
                                                        <div className='product_card__price_wrapper'>
                                                            <div className='product_card__price_container crossed'>
                                                                {(el.price * el.discount.price_with_discount).toFixed(2)} &#8381;
                                                            </div>
                                                            <div className='product_card__price_container with_sale'>
                                                                {el.price} &#8381;
                                                            </div>
                                                        </div>
                                                    )
                                                }

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
            {
                error.length != 0 && (
                    <div className='mainpageproducts__error'>
                        {error}
                    </div>
                )
            }

        </div >

    )
}

export default MainPageProducts