import '../../static/css/product/product-addtocart.css'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { fetchAddToFavorite } from './../../store/requests/Product/add-to-favorite';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const AddToFavorite = (props) => {

    const {
        isLogin,
        dispatch,
        product_id,
        setSidebarLogin,
        type
    } = props

    const isFavorite = useSelector(state => state.product.isFavorite)

    const handleClick = (e) => {
        e.preventDefault()
        if (isLogin) {
            dispatch(fetchAddToFavorite({ 'product_id': product_id, 'type': type }))
        } else {
            setSidebarLogin(true)
        }
    }

    return (
        <motion.button
            initial={{ backgroundColor: 'transparent' }}
            animate={{ backgroundColor: isFavorite ? '#FF6F61' : 'transparent' }}
            onClick={(e) => handleClick(e)}
            className={`product_addtocart__btn_favorite`}>
            <MdOutlineFavoriteBorder
                className={`product_addtocart__favorite_icon`} />
        </motion.button>
    )
}

export default AddToFavorite