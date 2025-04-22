import '../../static/css/product/product-write-review.css'
import photo from '../../static/images/reviewsWrite.png'

const ProductWriteReview = (props) => {

    const {
        setActivePopup,
        isActivePopup
    } = props

    return (
        <div className='product_write_review'>
            <div className='product_write_review__container'>
                <div className='product_write_review__title'>Уже читали эту книгу? Поделитесь вашим мнением!</div>
                <button
                    onClick={() => setActivePopup(!isActivePopup)} 
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