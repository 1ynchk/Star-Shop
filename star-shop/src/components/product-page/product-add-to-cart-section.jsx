import '../../static/css/product/product-addtocart.css'
import { GiConfirmed } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import AddToFavorite from './product-add-to-favorite';

const AddToCartSection = (props) => {

    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.users.isLogin)

    const {
        product,
        loading,
        setSidebarLogin
    } = props

    return (
        <>
            {
                !loading && (
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
                        {
                            product.amount != 0 ? (
                                <div className='product_addtocart__amount_container'>
                                    <GiConfirmed className='product_addtocart__amount_icon' />
                                    <div className='product_addtocart__amount_title'>
                                        В наличии
                                    </div>
                                </div>
                            ) : (
                                <div className='product_addtocart__amount_container'>
                                    <IoCloseOutline className='product_addtocart__amount_icon' />
                                    <div className='product_addtocart__amount_title'>
                                        Нет в наличии
                                    </div>
                                </div>
                            )
                        }
                        <div className='product_addtocart__bonuses_container'>
                            <CiGift className='product_addtocart__bonuses_icon' />

                            <div className='product_addtocart__bonuses_title'>
                                {Math.round(product.price * 0.03)} бонуса за покупку
                            </div>
                        </div>

                        <div className='product_addtocart__btns_container'>
                            <button className='product_addtocart__btn_buy'>
                                Купить
                            </button>
                            <AddToFavorite
                                setSidebarLogin={setSidebarLogin}
                                isLogin={isLogin}
                                product_id={product.id}
                                dispatch={dispatch} />
                        </div>
                    </div>
                )
            }

            {
                loading && (
                    <div className='loading_container empty_loading product_addtocart'>
                        <div className='shiny empty_loading'></div>
                    </div>
                )
            }
        </>
    )
}

export default AddToCartSection