import { useEffect, useState } from 'react'

import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { CiTrash } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { fetchReviewDelete } from '../../../store/requests/Product/delete-review';

const EditReview = (props) => {

    const [isDelete, setDelete] = useState(false)
    const dispatch = useDispatch()

    const {
        review_id,
        product_id,
        setChange
    } = props

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (
                !e.target.closest('.product_user_review__editreview_modal') &&
                !e.target.closest('.product_user_review__editreview')) {
                setDelete(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [])

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(fetchReviewDelete({ product_id: product_id, review_id: review_id }))
        setDelete(false)
    }

    return (
        <motion.div
            initial={{ width: '0px' }}
            animate={{ width: '80px' }}
            exit={{ width: '0px' }}
            className='product_user_review__editreview_container'>
            <CiTrash
                onClick={() => setDelete(!isDelete)}
                className='product_user_review__editreview' />
            <div className='product_user_review__editreview_delimiter'></div>
            <FiEdit2
                onClick={() => setChange(true)}
                className='product_user_review__editreview' />

            {
                isDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='product_user_review__editreview_modal'>
                        <div className='product_user_review__editreview_title'>
                            Удалить?
                        </div>
                        <div className='product_user_review__editreview_btns'>
                            <button
                                onClick={(e) => handleDelete(e)}
                                className='product_user_review__editreview_btn'>
                                Да
                            </button>
                            <button
                                onClick={() => setDelete(false)}
                                className='product_user_review__editreview_btn'>
                                Нет
                            </button>
                        </div>
                    </motion.div>
                )
            }
        </motion.div>
    )
}

export default EditReview