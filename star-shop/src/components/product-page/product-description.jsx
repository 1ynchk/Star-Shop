
const ProductDescription = (props) => {

    const {
        type,
        loading,
        product
    } = props

    return (
        <div className='product_description'>
            {
                type == 'book' ? (
                    <div className='product_description__title'>
                        Аннотация
                    </div>
                ) : (
                    <div className='product_description__title'>
                        Описание
                    </div>
                )
            }

            <div className='product_description__annotation'>
                {
                    loading ? (
                        <div className='loading_container empty_loading product_description'>
                            <div className='shiny empty_loading'></div>
                        </div>
                    ) : (
                        <>
                            {product.desc}
                        </>
                    )
                }
            </div>
            {
                type == 'book' && !loading && (
                    <table className='product_description__characteristics'>
                        <tbody>
                            <tr className='product_description__cell'>
                                <td className='product_description__column'>
                                    Серия
                                </td>
                                <td className='product_description__column'>
                                    {product.series}
                                </td>
                            </tr>
                            <tr className='product_description__cell'>
                                <td className='product_description__column'>
                                    Издательство
                                </td>
                                <td className='product_description__column'>
                                    {product.publisher}
                                </td>
                            </tr>
                            <tr className='product_description__cell'>
                                <td className='product_description__column'>
                                    Переплет
                                </td>
                                <td className='product_description__column'>
                                    {product.binding}
                                </td>
                            </tr>
                            <tr className='product_description__cell'>
                                <td className='product_description__column'>
                                    Страниц
                                </td>
                                <td className='product_description__column'>
                                    {product.count_pages}
                                </td>
                            </tr>
                            <tr className='product_description__cell'>
                                <td className='product_description__column'>
                                    Год, тираж
                                </td>
                                <td className='product_description__column'>
                                    {product.pub_year}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                )
            }


        </div>
    )
}

export default ProductDescription