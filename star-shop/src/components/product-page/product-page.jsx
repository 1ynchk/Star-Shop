import '../../static/css/product/product-images.css'
import '../../static/css/product/product.css'
import { useParams } from "react-router-dom"

import { fetchGetProduct } from './../../store/requests/Product/get-product';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const queryParams = new URLSearchParams(window.location.search)
    const type = queryParams.get('type')
    const product = useSelector(state => state.product.product)

    console.log(product)

    useEffect(() => {
        dispatch(fetchGetProduct({ 'id': id, 'type': type }))
    }, [])

    return (
        <div className="product">
            <h2>{product.name}</h2>
            <div className="product__container">
                {Object.keys(product).length != 0 && <ProductImage product={product} />}

            </div>
        </div>
    )
}

const ProductImage = (props) => {

    const {
        product
    } = props

    console.log(product)

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
                                <div className='ancillary_image'>
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