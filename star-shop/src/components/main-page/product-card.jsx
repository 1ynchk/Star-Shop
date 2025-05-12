import { NavLink } from 'react-router-dom';
import MainPageAddToFavorite from './main-page-add-to-favorite';

const ProductCard = (props) => {

    const {
        product,
        product_id,
        content_type,
        main_image,
        name,
        author,
        price,
        discount,
        isLogin,
        setSidebarLogin,
        dispatch
    } = props

    return (
        <div className='product_card_wrapper profile_favorite_card'>
            <div className='product_card'>
                <NavLink to={{
                    pathname: '/products/' + product_id,
                    search: '?type=' + content_type
                }}>
                    <div className='product_card__img_container'>
                        <img
                            className='product_card__img'
                            src={main_image}
                            alt='product card' />
                    </div>
                    <div className='product_card__title'>
                        {name.length < 50 ? name : `${name.slice(0, 50)}...`}
                    </div>
                    {
                        content_type == 'book' && (
                            <div className='product_card_author'>
                                {author.name}
                            </div>
                        )
                    }
                </NavLink>
                <div className='product_card__last_section'>
                    {
                        discount == null && (
                            <div className='product_card__price_container'>
                                {price} &#8381;
                            </div>
                        )
                    }
                    {
                        discount != null && (
                            <div className='product_card__price_wrapper'>
                                <div className='product_card__price_container crossed'>
                                    {(price * discount.price_with_discount).toFixed(2)} &#8381;
                                </div>
                                <div className='product_card__price_container with_sale'>
                                    {price} &#8381;
                                </div>
                            </div>
                        )
                    }

                    <div className='product_card_btns'>
                        <div className='product_card_btn'>
                            В корзину
                        </div>
                        <MainPageAddToFavorite
                            isLogin={isLogin}
                            setSidebarLogin={setSidebarLogin}
                            dispatch={dispatch}
                            product={product}
                            type={content_type}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard