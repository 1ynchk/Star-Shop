import { useSelector } from "react-redux"

import EmptyReviews from "./product-empty-review"
import ProductWriteReview from "./product-write-review"
import ProductReviewPopup from "./product-review-popup"
import ProductUserReview from "./product-user-review"
import { useState } from "react"

const ProductReviews = (props) => {

    const {
        type
    } = props

    const [isActivePopup, setActivePopup] = useState(false)
    const reviews = useSelector(state => state.product.reviews)
    const loading = useSelector(state => state.product.loading)

    console.log(reviews)

    return (
        <div className="product_reviews">
            <h3 className="product_reviews__title">Отзывы:</h3>
            <ProductWriteReview
                setActivePopup={setActivePopup}
                isActivePopup={isActivePopup}
            />
            {
                reviews.length == 0 && <EmptyReviews />
            }
            {
                reviews.length != 0 && (
                    reviews.map((el, ind) => {
                        return <ProductUserReview 
                                key={ind}
                                user={el.user} 
                                review={el.review}
                                product_id={el.object_id}
                                date_add={el.date_add}
                        />
                    })
                )
            }

            <ProductReviewPopup
                setActivePopup={setActivePopup}
                isActivePopup={isActivePopup}
                loading={loading}
                type={type}
            />

        </div>

    )
}

export default ProductReviews