import { useEffect, useState } from 'react'
import '../../static/css/common/sidebar-catalog.css'
import { motion, AnimatePresence } from "framer-motion"
import { CiWarning } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";

import { fetchGetCategories } from '../../store/requests/MainPage/get-categories'
import Loading from './loading'

const SidebarCatalog = (props) => {

    const [componentRender, setComponentRender] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [isSubcatChoisen, setSubcatChoisen] = useState(false)

    const {
        isSidebarCatalog,
        setSidebarCatalog
    } = props

    useEffect(() => {
        if (isSidebarCatalog) {
            if (!componentRender) {
                fetchGetCategories(
                    {
                        'setter': setCategories,
                        'setterLoading': setLoading,
                        'setterError': setError
                    })
                setComponentRender(true)
            }
        }
    }, [isSidebarCatalog])

    const reloadCategories = () => {
        setError('')
        fetchGetCategories(
            {
                'setter': setCategories,
                'setterLoading': setLoading,
                'setterError': setError
            })
        setComponentRender(true)
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {
                isSidebarCatalog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarCatalog(!isSidebarCatalog)}
                        className="sidebar_login_wrapper">
                        <motion.div
                            transition={{ delay: 0.2, ease: 'easeOut' }}
                            initial={{ x: -70, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className='sidebar_catalog'>
                            <div className='sidebar_catalog__container'>
                                {
                                    loading && <Loading />
                                }
                                {
                                    error.length > 0 && !loading && (
                                        <ErrorComponent
                                            func={reloadCategories}
                                            error={error} />)
                                }

                                <div className='category_container'>
                                    {
                                        !loading && (
                                            categories.map((el, ind) => {
                                                return <Category
                                                    key={ind}
                                                    subcats={el.subcats}
                                                    name={el.name} />
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

const Category = (props) => {

    const {
        name,
        subcats
    } = props

    return (
        <div
            className='category'>
            <div className='category__subcontainer'>
                <div className='dot'></div>
                <div className='category__name'>
                    {name}
                </div>

            </div>
            {
                subcats.length != 0 && <FaLongArrowAltRight className='category__arrow' />
            }

        </div>
    )
}

const ErrorComponent = (props) => {

    const {
        error,
        func
    } = props

    return (
        <div className='sidebar_error'>
            <div className='sidebar_error_container'>
                <CiWarning
                    className='sidebar_error_icon' />
                <div className='sidebar_error_number'>
                    {error}
                </div>
            </div>
            <div>Произошла ошибка</div>
            <button
                onClick={() => func()}
                className='sidebar_reload'>
                <IoReload />
                <div>Перезагрузить</div>
            </button>
        </div>
    )
}

export default SidebarCatalog