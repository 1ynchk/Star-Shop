import { useEffect, useRef, useState } from 'react'

import '../../static/css/product/product-user-review.css'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { CiTrash } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";

const ProductUserReview = (props) => {

    const {
        product_id,
        review,
        user,
        date_add
    } = props

    const [isOpen, setOpen] = useState(false)
    const reviewRef = useRef(null)
    const userId = useSelector(state => state.users.userId)

    console.log(userId)

    useEffect(() => {

        if (review.length > 300) {
            reviewRef.current.classList.add('strict')
            console.log(reviewRef.current.classList)
        }
    }, [])

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
                </div>

                <div ref={reviewRef} className='product_user_review__value'>
                    {review}
                </div>

                <div className='product_user_review__wrapper'>
                    {
                        review.length > 300 && <OpenReview
                            isOpen={isOpen}
                            setOpen={setOpen}
                            reviewRef={reviewRef}
                        />
                    }

                    {
                        userId != null && userId == user.id && <EditReview />
                    }
                </div>

            </div>
        </div>
    )

}

const EditReview = (props) => {
    const {

    } = props

    return (
        <div className='product_user_review__editreview_container'>
            <CiTrash className='product_user_review__editreview'/>
            <div className='product_user_review__editreview_delimiter'></div> 
            <FiEdit2 className='product_user_review__editreview' />
        </div>
    )
}

const OpenReview = (props) => {

    const {
        reviewRef,
        isOpen,
        setOpen
    } = props

    useEffect(() => {
        if (isOpen) {
            reviewRef.current.classList.add('open')
        } else {
            reviewRef.current.classList.remove('open')
        }
    }, [isOpen])

    return (
        <div
            onClick={() => setOpen(!isOpen)}
            className='product_user_review__open_container'>
            <div className='product_user_review__open'>
                {
                    !isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='product_user_review__open_title'>
                            Раскрыть отзыв
                        </motion.div>
                    )
                }
                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='product_user_review__open_title'>
                            Свернуть отзыв
                        </motion.div>
                    )
                }
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 0 : 180 }}
                    className='product_user_review__open_arrow'>
                    ↑
                </motion.div>
            </div>
        </div>
    )
}

export default ProductUserReview