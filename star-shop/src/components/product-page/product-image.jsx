const ProductImage = (props) => {

    const {
        product,
        loading
    } = props

    return (
        <div className="product_image">
            {
                !loading && (
                    <div className='product_image__main_image_container'>
                        <img
                            alt='main image'
                            src={product.main_image}
                            className='product_image__main_image'
                            onLoad={(e) => e.target.style.opacity = 1}
                            style={{opacity: 0, transition: 'opacity 0.5 ease'}}
                        />
                    </div>
                )
            }

            {
                loading && (
                    <div className="loading_container empty_loading product_image__main_image_container">
                        <div className='shiny empty_loading'></div>
                    </div>
                )
            }

            <div className='product_image__container'>
                {
                    !loading && 
                    product.ancillary_images != undefined && 
                    product.ancillary_images.length != 0 && (
                        product.ancillary_images.map((el, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className='ancillary_image'>
                                    <img
                                        src={el.image}
                                        alt="ancillary image"
                                        className='product_image__ancillary_image'onLoad={(e) => e.target.style.opacity = 1}
                                        style={{opacity: 0, transition: 'opacity 0.5 ease'}}
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

export default ProductImage