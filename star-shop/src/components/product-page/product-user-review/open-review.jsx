import { useEffect } from 'react'
import { motion } from 'framer-motion';

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

export default OpenReview