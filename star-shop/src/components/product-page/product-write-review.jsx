import { useSelector } from 'react-redux'
import '../../static/css/product/product-write-review.css'
import photo from '../../static/images/reviewsWrite.png'

const ProductWriteReview = (props) => {

    const isLogin = useSelector(state => state.users.isLogin)

    const {
        setActivePopup,
        isActivePopup,
        setSidebarLogin
    } = props

    const handleClick = () => {
        if (isLogin) {
            setActivePopup(!isActivePopup)
        } else {
            setSidebarLogin(true)
        }
    }

    return (
        <div className='product_write_review'>
            <div className='product_write_review__container'>
                <div className='product_write_review__title'>Уже читали эту книгу? Поделитесь вашим мнением!</div>
                <button
                    onClick={() => handleClick()}
                    className='product_write_review__btn'>
                    Написать отзыв
                </button>
            </div>
            <div className='product_write_review__img_wrapper'>
                <img alt='cat' src={photo} className='product_write_review__img' />
            </div>
        </div>
    )
}

export default ProductWriteReview