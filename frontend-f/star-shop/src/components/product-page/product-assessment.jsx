import { fetchPostAssessment } from '../../store/requests/Product/post-assessment'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { rateCircle } from '../bll/product/rate'

import { AiOutlineLike } from "react-icons/ai"
import { AiOutlineDislike } from "react-icons/ai"


const Assessment = (props) => {

    const {
        setSidebarLogin
    } = props

    const [rate, setRate] = useState('null')
    const [isUserAction, setIsUserAction] = useState(false)
    const usersRate = useSelector(state => state.product.usersRate)
    const assessments = useSelector(state => state.product.assessments)
    const isLogin = useSelector(state => state.users.isLogin)
    const dispatch = useDispatch()

    const { product_id, type, loading } = props

    useEffect(() => {
        if (usersRate != null) {
            setRate(usersRate)
        }
    }, [usersRate])

    useEffect(() => {
        if (isUserAction) {
            dispatch(fetchPostAssessment({
                'rate': rate,
                'product_id': product_id,
                'type': type
            }))
        }
    }, [rate, isUserAction])

    const changeAssessment = (assessment) => {
        if (isLogin) {
            setIsUserAction(true)
            if (assessment == 'like') {
                if (rate == 'dislike' || rate == 'null') {
                    setRate('like')
                }

                if (rate == 'like' && assessment == 'like') {
                    setRate('null')
                }
            }
            if (assessment == 'dislike') {
                if (rate == 'like' || rate == 'null') {
                    setRate('dislike')
                }

                if (rate == 'dislike' && assessment == 'dislike') {
                    setRate('null')
                }
            }
        } else {
            setSidebarLogin(true)
        }

    }

    return (
        <div className='assessment'>
            <div className="assessment__container">
                {
                    !loading && rateCircle(assessments)
                }
                {
                    loading && (
                        <div className='loading_container empty_loading rate_circle'>
                            <div className='shiny empty_loading'></div>
                        </div>
                    )
                }
                {
                    !loading && (
                        <>
                            {
                                assessments.length == 0 ? (
                                    <div className='assessment__insc'>
                                        Нет оценок
                                    </div>
                                ) : (
                                    <div className='assessment__insc'>
                                        Кол-во оценок: {assessments.length}
                                    </div>
                                )
                            }
                        </>
                    )
                }
                {
                    loading && (
                        <div className='loading_container empty_loading product_assessment'>
                            <div className='shiny empty_loading'></div>
                        </div>
                    )
                }


            </div>
            <div className='assessment__container rate'>
                <AnimatePresence>
                    <motion.button
                        key={1}
                        initial={{ backgroundColor: 'transparent' }}
                        animate={{ backgroundColor: rate == 'dislike' ? '#ffa500' : 'transparent' }}
                        onClick={() => changeAssessment('dislike')}
                        className='assessment__rate dislike'>
                        <AiOutlineDislike />
                    </motion.button>
                    <div className='assessment__delimeter'></div>
                    <motion.button
                        key={2}
                        initial={{ backgroundColor: 'transparent' }}
                        animate={{ backgroundColor: rate == 'like' ? '#ffa500' : 'transparent' }}
                        onClick={() => changeAssessment('like')}
                        className='assessment__rate like'>
                        <AiOutlineLike />
                    </motion.button>
                </AnimatePresence>

            </div>
        </div >
    )
}

export default Assessment