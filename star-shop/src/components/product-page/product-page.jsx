import '../../static/css/product/product-images.css'
import '../../static/css/product/product.css'
import '../../static/css/product/product-addtocart.css'
import { useParams } from "react-router-dom"

import { fetchGetProduct } from './../../store/requests/Product/get-product'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Assessment from './product-assessment'
import ProductImage from './product-image'
import ProductDescription from './product-description'
import EmptyReviews from './product-reviews';

const ProductPage = (props) => {

    const {
        setSidebarLogin
    } = props

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
                setSidebarLogin={setSidebarLogin}
            />

            <div className="product__container">
                <ProductImage product={product} loading={loading} />
                <ProductDescription product={product} loading={loading} type={type} />
                <AddToCartSection loading={loading} product={product} />
            </div>

            <EmptyReviews />
        </div>
    )
}

const AddToCartSection = (props) => {

    const {
        product,
        loading
    } = props

    return (
        <div className='product_addtocart'>
            {
                product.discount == null && (
                    <div className='product_card__price_container prod_page'>
                        {product.price} &#8381;
                    </div>
                )
            }
            {
                product.discount != null && (
                    <div className='product_card__price_wrapper prod_page_wrapper'>
                        <div className='product_card__price_container prod_page crossed'>
                            {(product.price * product.discount.price_with_discount).toFixed(2)} &#8381;
                        </div>
                        <div className='product_card__price_container with_sale prod_page_with_sale'>
                            {product.price} &#8381;
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductPage