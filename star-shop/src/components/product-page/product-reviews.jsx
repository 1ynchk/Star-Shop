import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"

import EmptyReviews from "./product-empty-review"
import ProductWriteReview from "./product-write-review"
import ProductReviewPopup from "./product-review-popup"
import { useState } from "react"
import ProductUserReview from "./product-user-review/product-user-review"
import { fetchGetNextPage } from './../../store/requests/Product/get-next-page';
import Loading from "../common/loading"

const ProductReviews = (props) => {

    const {
        type,
        setSidebarLogin
    } = props

    const dispatch = useDispatch()
    const [isActivePopup, setActivePopup] = useState(false)
    const reviews = useSelector(state => state.product.reviews)
    const loading = useSelector(state => state.product.loading)
    const nextPageReviews = useSelector(state => state.product.nextPageReviews)
    const nextPageLoading = useSelector(state => state.product.nextPageLoading)

    const handleNextPage = (e) => {
        e.preventDefault()
        dispatch(fetchGetNextPage({ 'next_page': nextPageReviews }))
    }

    return (
        <div className="product_reviews">
            <h3 className="product_reviews__title">Отзывы:</h3>
            <ProductWriteReview
                setActivePopup={setActivePopup}
                isActivePopup={isActivePopup}
                setSidebarLogin={setSidebarLogin}
            />
            {
                reviews.length == 0 && <EmptyReviews />
            }
            {
                reviews.length != 0 && (
                    reviews.map(el => {
                        return <ProductUserReview
                            key={el.id}
                            id={el.id}
                            user={el.user}
                            review={el.review}
                            product_id={el.object_id}
                            date_add={el.date_add}
                            is_changed={el.is_changed}
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

            {
                nextPageLoading && (
                    <motion.div
                        className="product_reviews__loading_container"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        >
                            <Loading/>
                    </motion.div>
                )
            }
            {
                nextPageReviews != null && !nextPageLoading && (
                    <button
                        onClick={(e) => handleNextPage(e)}
                        className="product_reviews__next">
                        Загрузить еще отзывы
                    </button>
                )
            }

        </div>

    )
}

export default ProductReviews