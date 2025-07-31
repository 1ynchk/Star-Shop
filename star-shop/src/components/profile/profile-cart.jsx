import '../../static/css/profile/profile-card.css'
import { motion } from "framer-motion"
import ProfileSectionVars from '../bll/framer-motion/profile-sections'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchGetCart } from '../../store/requests/Users/get-cart'

const ProfileCart = (props) => {
   
    const [isCart, setCart] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetCart())  
    }, [])
    
    return (
        <motion.div
            initial='initial'
            animate='visible'
            variants={ProfileSectionVars}>
            <h3 className="profile_root__section_name">Корзина</h3>

            {
                isCart && (
                <div className='cart__all_wrapper'>
                    <div className="cart__btn_check_all_wrapper">
                        <label className="cart__checkbox_label">
                            <input type="checkbox" className="cart__btn_check_all"/>
                            <span className="cart__custom_checkbox"></span>
                        </label>
                        <div className='cart__btn_check_all_title'>Выбрать все</div>
                    </div>  
                    <div className='cart__wrapper_card'>
                        <div className='cart__wrapper_card_title'>Доступны для заказа</div>
                        <div className="cart__container_card">

                        </div>   
                    </div>
                </div>
                
                )
            }
        </motion.div>
    )
}

export default ProfileCart