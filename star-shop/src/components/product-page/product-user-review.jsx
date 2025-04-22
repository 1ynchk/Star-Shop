import '../../static/css/product/product-user-review.css'

const ProductUserReview = (props) => {

    const {
        product_id,
        review,
        user,
        date_add
    } = props

    console.log(user.avatar)

    return (
        <div className='product_user_review'>
            <img src={user.avatar} className='product_user_review__avatar' />
            <div className='product_user_review__container'>
                <div className='product_user_review__name'>
                    {user.surname} {user.name}
                </div>
            </div>
        </div>
    )

}

export default ProductUserReview