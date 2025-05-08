import '../../static/css/profile/profile-favorite.css'
import { motion } from 'framer-motion'
import ProfileSectionVars from '../bll/framer-motion/profile-sections'
import { fetchProfile } from './../../store/requests/Users/profile-favorite';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../main-page/product-card';
import Loading from './../common/loading';

const ProfileFavorite = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

    const favoriteProducts = useSelector(state => state.profile.favoriteProducts)
    const favoriteLoading = useSelector(state => state.profile.favoriteLoading)

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
                                key={ind}
                                product_id={el.id}
                                content_type={el.content_type}
                                main_image={el.main_image}
                                name={el.name}
                                author={el.author}
                                price={el.price}
                                discount={el.discount}
                                product={el}
                            />
                        })
                    )
                }
            </div>
        </motion.div>
    )
}

export default ProfileFavorite