import '../../static/css/product/product-images.css'
import '../../static/css/product/product.css'
import { useParams } from "react-router-dom"

import { fetchGetProduct } from './../../store/requests/Product/get-product'
import { fetchPostAssessment } from './../../store/requests/Product/post-assessment'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { rateCircle } from '../bll/product/rate'

import { AiOutlineLike } from "react-icons/ai"
import { AiOutlineDislike } from "react-icons/ai"

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const queryParams = new URLSearchParams(window.location.search)
    const type = queryParams.get('type')
    const product = useSelector(state => state.product.product)
    const loading = useSelector(state => state.product.loading)

    useEffect(() => {
        dispatch(fetchGetProduct({ 'id': id, 'type': type }))
    }, [])

    return (
        <div className="product">
            {
                loading == false && Object.keys(product).length != 0 && (
                    <>
                        <h2>{product.name}</h2>
                        {
                            product.author && (
                                <h3 className='product__book_author'>{product.author.name}</h3>
                            )
                        }
                    </>
                )
            }

            <Assessment
                product_id={id}
                type={type}
                loading={loading}
            />
            <div className="product__container">
                {Object.keys(product).length != 0 && <ProductImage product={product} />}

            </div>
        </div>
    )
}

const Assessment = (props) => {

    const [rate, setRate] = useState('null')
    const [isUserAction, setIsUserAction] = useState(false)
    const usersRate = useSelector(state => state.product.usersRate)
    const assessments = useSelector(state => state.product.assessments)
    const dispatch = useDispatch()

    const { product_id, type } = props

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
    }

    return (
        <div className='assessment'>
            <div className="assessment__container">
                {rateCircle(assessments)}
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

const ProductImage = (props) => {

    const {
        product
    } = props

    return (
        <div className="product_image">
            <div className='product_image__main_image_container'>
                <img
                    alt='main image'
                    src={product.main_image}
                    className='product_image__main_image'
                />
            </div>
            <div className='product_image__container'>
                {
                    product.ancillary_images.length != 0 && (
                        product.ancillary_images.map((el, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className='ancillary_image'>
                                    <img
                                        src={el.image}
                                        alt="ancillary image"
                                        className='product_image__ancillary_image'
                                    />
                                </div>
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}

export default ProductPage