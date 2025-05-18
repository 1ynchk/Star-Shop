import '../../static/css/product/product-review-popup.css'
import { IoCloseOutline } from "react-icons/io5";

import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import Assessment from './product-assessment';
import { useEffect, useRef, useState } from 'react';
import { fetchPostReview } from './../../store/requests/Product/post-review';

const ProductReviewPopup = (props) => {

    const {
        setActivePopup,
        isActivePopup,
        loading,
        type,
    } = props

    const [countSymbols, setCountSymbols] = useState(0)
    const [isBtnAcitve, setBtnActive] = useState(false)
    const dispatch = useDispatch()
    const textAreaRef = useRef(null)

    useEffect(() => {
        setCountSymbols(0)
    }, [isActivePopup])

    useEffect(() => {
        if (countSymbols >= 300) {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [countSymbols])

    const product = useSelector(state => state.product.product)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchPostReview(
            {
                'product_id': product.id,
                'value': textAreaRef.current.value
            }
        ))
        setActivePopup(false)
    }

    return (
        <AnimatePresence>
            {
                isActivePopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='product_review_popup__wrapper'
                        onClick={() => setActivePopup(!isActivePopup)}>
                        <motion.div
                            className='product_review_popup__container'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IoCloseOutline
                                onClick={() => setActivePopup(false)}
                                className='product_review_popup__close'
                            />
                            <div className='product_review_popup__subcontainer'>
                                <img
                                    className='product_review_popup__img'
                                    src={product.main_image}
                                    alt="product" />
                                <div className='product_review_popup__info'>
                                    <div className='product_review_popup__title'>
                                        {product.name}
                                    </div>
                                    <Assessment
                                        loading={loading}
                                        product_id={product.id}
                                        type={type}
                                    />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    ref={textAreaRef}
                                    onChange={(e) => setCountSymbols(e.target.value.length)}
                                    placeholder='Напишите свой отзыв!'
                                    className='product_review_popup__textarea'>
                                </textarea>
                                <CountSymbols
                                    countSymbols={countSymbols} />

                                <button
                                    type='submit'
                                    disabled={!isBtnAcitve}
                                    className='product_review_popup__btn'>
                                    {
                                        isBtnAcitve ? 'Опубликовать' : 'Слишком короткий отзыв'
                                    }
                                </button>
                            </form>

                        </motion.div>

                    </motion.div>
                )
            }

        </AnimatePresence>

    )
}

export const CountSymbols = (props) => {

    const {
        countSymbols
    } = props

    return (
        <div className='product_review_popup__countsymbols'>
            {countSymbols}/300
        </div>
    )
}

export default ProductReviewPopup