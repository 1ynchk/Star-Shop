import { useEffect, useRef, useState } from 'react'

import '../../../static/css/product/product-user-review.css'
import { AnimatePresence, motion } from 'framer-motion';
import {  useSelector } from 'react-redux';
import { FiEdit2 } from "react-icons/fi";
import { CountSymbols } from '../product-review-popup';
import ChangeBtns from './change-btns';
import EditReview from './edit-review';
import OpenReview from './open-review';

const ProductUserReview = (props) => {

    const {
        id,
        product_id,
        review,
        user,
        date_add,
        is_changed
    } = props

    const [isOpen, setOpen] = useState(false)
    const [isChange, setChange] = useState(false)
    const [changedReview, setChangedReview] = useState('')
    const [countSymbols, setCountSymbols] = useState(0)
    const reviewRef = useRef(null)
    const userId = useSelector(state => state.users.userId)

    useEffect(() => {

        if (review.length >= 300 && !isChange) {
            reviewRef.current.classList.add('strict')
        }
    }, [isChange])

    useEffect(() => {
        setChangedReview(review)
        setCountSymbols(review.length)
    }, [review])

    return (
        <div className='product_user_review'>
            <img src={user.avatar} className='product_user_review__avatar' />
            <div className='product_user_review__container'>
                <div className='product_user_review__subcontainer'>
                    <div className='product_user_review__name'>
                        {user.surname} {user.name}
                    </div>
                    <div className='product_user_review__date'>
                        {date_add}
                    </div>

                    {
                        is_changed && (
                            <div className='product_user_review__changed_container'>
                                <FiEdit2 className='product_user_review__changed' />
                                <div className='product_user_review__changed_message'>
                                    Комментарий был изменен
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    !isChange ? (
                        <div ref={reviewRef} className='product_user_review__value'>
                            {review}
                        </div>
                    ) : <>
                            <textarea
                                defaultValue={changedReview}
                                onChange={(e) => {
                                    setChangedReview(e.target.value)
                                    setCountSymbols(e.target.value.length)
                                }}
                                className='product_user_review__change_value' />
                            <CountSymbols countSymbols={countSymbols} />
                        </>
                }

                <div className='product_user_review__wrapper'>
                    {
                        review.length >= 300 && !isChange && <OpenReview
                            isOpen={isOpen}
                            setOpen={setOpen}
                            reviewRef={reviewRef}
                        />
                    }
                    <AnimatePresence>
                        {
                            userId != null && userId == user.id && !isChange &&
                            <EditReview
                                product_id={product_id}
                                review_id={id}
                                setChange={setChange}
                            />
                        }

                        {
                            isChange && userId != null && userId == user.id &&
                            <ChangeBtns
                                review={review}
                                changedReview={changedReview}
                                review_id={id}
                                setChange={setChange}
                                product_id={product_id} />
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ProductUserReview