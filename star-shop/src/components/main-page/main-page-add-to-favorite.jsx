import '../../static/css/product/product-addtocart.css'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { fetchAddToFavorite } from '../../store/requests/Product/add-to-favorite';
import { motion } from 'framer-motion';

const MainPageAddToFavorite = (props) => {

    const {
        isLogin,
        dispatch,
        setSidebarLogin,
        product,
        type
    } = props

    const handleClick = (e) => {
        e.preventDefault()
        if (isLogin) {
            dispatch(fetchAddToFavorite({ 'product_id': product.id, type: type }))
        } else {
            setSidebarLogin(true)
        }
    }

    return (
        <motion.button
            initial={{ backgroundColor: 'transparent' }}
            animate={{ backgroundColor: product.user_favorite.length != 0 ? '#FF6F61' : 'transparent' }}
            onClick={(e) => handleClick(e)}
            className={`product_addtocart__btn_favorite`}>
            <MdOutlineFavoriteBorder
                className={`product_addtocart__favorite_icon`} />
        </motion.button>
    )
}

export default MainPageAddToFavorite