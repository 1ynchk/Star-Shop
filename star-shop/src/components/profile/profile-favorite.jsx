import '../../static/css/profile/profile-favorite.css'
import { motion } from 'framer-motion'
import ProfileSectionVars from '../bll/framer-motion/profile-sections'
import { fetchProfile } from './../../store/requests/Users/profile-favorite';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import favoriteEmpty from '../../static/images/favoriteEmpty.png'
import ProductCard from '../main-page/product-card';
import Loading from './../common/loading';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const ProfileFavorite = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

    const favoriteProducts = useSelector(state => state.profile.favoriteProducts)
    const favoriteLoading = useSelector(state => state.profile.favoriteLoading)
    const isLogin = useSelector(state => state.users.isLogin)

    return (
        <motion.div
            initial='initial'
            animate='visible'
            variants={ProfileSectionVars}>
            <h3 className="profile_root__section_name">Избранное</h3>

            {
                favoriteLoading && (
                    <div className='profile_favorite__loading_container'>
                        <Loading />
                    </div>
                )
            }
            <div className='profile_favorite__container'>
                {
                    !favoriteLoading && favoriteProducts.length != 0 && (
                        favoriteProducts.map((el, ind) => {
                            return <ProductCard
                                isLogin={isLogin}
                                key={ind}
                                product_id={el.id}
                                content_type={el.content_type}
                                main_image={el.main_image}
                                name={el.name}
                                author={el.author}
                                price={el.price}
                                discount={el.discount}
                                product={el}
                                dispatch={dispatch}
                            />
                        })
                    )
                }
                {
                    !favoriteLoading && favoriteProducts.length == 0 && (
                        <div className='profile_favorite__empty_container'>
                            <div className='profile_favorite__empty_circle first_empty_circle'></div>
                            <div className='profile_favorite__empty_circle second_empty_circle'></div>
                            <div className='profile_favorite__empty_circle third_empty_circle'></div>
                            <div className='profile_favorite__empty_subcontainer'>
                                <div className='profile_favorite__empty_wrapper'>
                                    <h3 className='profile_favorite__empty_title'>В избраном пока что ничего нет</h3>
                                    <NavLink
                                        to='/'
                                        className='profile_favorite__empty_btn'>
                                        Перейти к покупкам
                                        <FaArrowRight className='profile_favorite__empty_arrow' />
                                    </NavLink>
                                </div>

                            </div>
                            <div className='profile_favorite__image_container'>
                                <div className='profile_favorite__image_bg'>
                                </div>
                                <img
                                    className='profile_favorite__image'
                                    src={favoriteEmpty}
                                />

                            </div>
                        </div>
                    )
                }
            </div>
        </motion.div>
    )
}

export default ProfileFavorite