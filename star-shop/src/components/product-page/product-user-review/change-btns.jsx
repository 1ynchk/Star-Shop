import { useEffect, useState } from 'react'

import {  motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateReview } from '../../../store/requests/Product/update-review';
import Loading from '../../common/loading';

const ChangeBtns = (props) => {

    const {
        setChange,
        product_id,
        review_id,
        changedReview,
        review
    } = props

    const dispatch = useDispatch()
    const [isActive, setActive] = useState(false)
    const reviewUpdateLoading = useSelector(state => state.product.reviewUpdateLoading)
    const isReviewChanged = useSelector(state => state.product.isReviewChanged)

    useEffect(() => {
        if (changedReview.length < 300 || review == changedReview) {
            setActive(false)
        } else {
            setActive(true)
        }
    }, [changedReview])

    useEffect(() => {
        if (isReviewChanged != null) {
            setChange(false)
        }
    }, [isReviewChanged])

    const handleSave = (e) => {
        e.preventDefault()
        setActive(false)
        dispatch(fetchUpdateReview({
            product_id: product_id,
            review_id: review_id,
            review: changedReview
        }))
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button
                disabled={reviewUpdateLoading}
                onClick={() => setChange(false)}
                className='product_user_review__change_review_cancel'>
                Отмена
            </button>
            <button
                disabled={!isActive}
                onClick={(e) => handleSave(e)}
                className='product_user_review__change_review_save'>
                {
                    reviewUpdateLoading && (
                        <div className='product_user_review__change_review_save_loading'>
                            <Loading />
                        </div>
                    )
                }
                {
                    !reviewUpdateLoading && 'Сохранить'
                }
            </button>
        </motion.div>
    )
}

export default ChangeBtns