import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fetchAddToCart } from "../../store/requests/Product/add-to-cart"

const MainPageAddToCart = (props) => {
    const {
        isLogin,
        dispatch,
        setSidebarLogin,
        product,
        type,
        cartFetchLoading
    } = props

    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        if (isLogin) {
            dispatch(fetchAddToCart(
                {
                'product_id': product.id, 
                "type": type }
            ))
        } else {
            setSidebarLogin(true)
        }
    }

    return (
        <motion.button
        disabled={cartFetchLoading}
        initial={{ backgroundColor: '#FFA500' }}
            animate={{ 
                backgroundColor: product.user_cart.length != 0 
                ? '#3F704D' : '#FFA500', 
                color: product.user_cart.length != 0 
                ? '#FFFFFF' : '#323232'
             }}
            onClick={(e) => {
                if (product.user_cart.length != 0) {
                    navigate('/profile/cart')
                } else {
                    handleClick(e)
                }
            }}
            className='product_addtocart__btn_buy'>
                {
                    product.user_cart.length != 0 ? 'В корзину' : 'Купить'
                }
        </motion.button>
    )
}

export default MainPageAddToCart