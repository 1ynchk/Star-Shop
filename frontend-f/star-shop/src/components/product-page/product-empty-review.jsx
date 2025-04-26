import '../../static/css/product/product-reviews.css'
import list from '../../static/images/list.png'

const EmptyReviews = () => {
    return (
        <div className='emptyReview'>
            <div className='emptyReview__image_container'>
                <img alt='list' src={list} className='emptyReview__image' />
            </div>
            <div className='emptyReview__title'>Еще нет отзывов. Поделитесь вашим мнением первым!</div>
            <div className='emptyReview__circle first'></div>
            <div className='emptyReview__circle second'></div>
        </div>
    )
}

export default EmptyReviews