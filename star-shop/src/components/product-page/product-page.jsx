import '../../static/css/product/product-images.css'
import '../../static/css/product/product.css'
import { useParams } from "react-router-dom"

import { fetchGetProduct } from './../../store/requests/Product/get-product'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Assessment from './product-assessment'
import ProductImage from './product-image'
import ProductDescription from './product-description'
import ProductReviews from './product-reviews'
import AddToCartSection from './product-add-to-cart-section'
import { clearState } from '../../store/slices/ProductSlice'

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
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(fetchGetProduct({ 'id': id, 'type': type }))

        return () => {
            dispatch(clearState())
        }
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
                <AddToCartSection
                    setSidebarLogin={setSidebarLogin}
                    loading={loading}
                    product={product} />
            </div>

            <ProductReviews
                setSidebarLogin={setSidebarLogin}
                type={type} />
        </div>
    )
}

export default ProductPage