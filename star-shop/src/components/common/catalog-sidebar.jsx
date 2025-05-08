import { useEffect, useState } from 'react'
import '../../static/css/common/sidebar-catalog.css'
import { motion, AnimatePresence } from "framer-motion"
import { CiWarning } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import { fetchGetCategories } from '../../store/requests/MainPage/get-categories'
import Loading from './loading'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesError } from '../../store/slices/MainPageSlice';

const SidebarCatalog = (props) => {

    const [componentRender, setComponentRender] = useState(false)
    const dispatch = useDispatch()
    const [isSubcatChoisen, setSubcatChoisen] = useState(false)
    const categories = useSelector(state => state.mainpage.categories)
    const categoriesLoading = useSelector(state => state.mainpage.categoriesLoading)
    const categoriesError = useSelector(state => state.mainpage.categoriesError)

    const {
        isSidebarCatalog,
        setSidebarCatalog
    } = props

    useEffect(() => {
        if (isSidebarCatalog) {
            if (!componentRender) {
                dispatch(fetchGetCategories())
                setComponentRender(true)
            }
        }
    }, [isSidebarCatalog])

    const reloadCategories = () => {
        dispatch(setCategoriesError(''))
        dispatch(fetchGetCategories())
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
                        onClick={() => {
                            setSidebarCatalog(!isSidebarCatalog)
                            setSubcatChoisen(false)
                        }
                        }
                        className="sidebar_login_wrapper">
                        <motion.div
                            transition={{ delay: 0.2, ease: 'easeOut' }}
                            initial={{ x: -70, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className='sidebar_catalog'>
                            <RxCross1
                                className='sidebar_catalog__close'
                                onClick={() => {
                                    setSidebarCatalog(!isSidebarCatalog)
                                    setSubcatChoisen(false)
                                }}
                            />
                            {
                                isSubcatChoisen != false && (
                                    <motion.div
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -10, opacity: 0 }}
                                        className='sidebar__header_container'>
                                        <IoIosArrowBack
                                            onClick={() => {
                                                setSubcatChoisen(false)
                                            }}
                                            className='is_subcat_choisen'
                                        />
                                        <div className='sidebar_categories_title'>
                                            {isSubcatChoisen.name}
                                        </div>
                                    </motion.div>
                                )
                            }
                            {
                                isSubcatChoisen == false && (
                                    <motion.div
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -10, opacity: 0 }}
                                        className='sidebar__header_container'>
                                        <div className='sidebar_categories_title'>
                                            Категории
                                        </div>
                                    </motion.div>

                                )
                            }

                            <div className='sidebar_catalog__container'>
                                {
                                    categoriesLoading && <Loading />
                                }
                                {
                                    categoriesError.length > 0 && !categoriesLoading && (
                                        <ErrorComponent
                                            func={reloadCategories}
                                            categoriesError={categoriesError} />)
                                }
                                {
                                    categoriesError.length == 0 && (
                                        <div className='category_container'>
                                            {
                                                !categoriesLoading && isSubcatChoisen == false && (
                                                    categories.map((el, ind) => {
                                                        return <Category
                                                            setter={setSubcatChoisen}
                                                            value={el}
                                                            key={ind}
                                                            subcats={el.subcats}
                                                            name={el.name} />
                                                    })
                                                )
                                            }
                                            {
                                                !categoriesLoading && isSubcatChoisen != false && (
                                                    isSubcatChoisen.subcats.map((el, ind) => {
                                                        return <Subcategory
                                                            key={ind}
                                                            id={el.id}
                                                            name={el.name}
                                                        />
                                                    })
                                                )
                                            }
                                        </div>)
                                }

                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

const Subcategory = (props) => {

    const {
        name,
    } = props

    return (
        <NavLink
            className='category'
        >
            <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                className='category__subcontainer'>
                <div className='category__name'>
                    {name}
                </div>

            </motion.div>
        </NavLink>
    )
}

const Category = (props) => {
    const {
        name,
        subcats,
        setter,
        value
    } = props

    return (
        <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}>
            {
                subcats.length == 0 && (
                    <NavLink
                        className='category'
                    >
                        <motion.div
                            className='category__subcontainer'>
                            <div className='category__name'>
                                {name}
                            </div>

                        </motion.div>
                    </NavLink>
                )
            }
            {
                subcats.length != 0 && (
                    <motion.div
                        onClick={() => setter(value)}
                        className='category'>
                        <div className='category__subcontainer'>
                            <div className='category__name'>
                                {name}
                            </div>

                        </div>
                        <FaLongArrowAltRight className='category__arrow' />
                    </motion.div>
                )
            }
        </motion.div>
    )
}

const ErrorComponent = (props) => {

    const {
        categoriesError,
        func
    } = props

    return (
        <div className='sidebar_error'>
            <div className='sidebar_error_container'>
                <CiWarning
                    className='sidebar_error_icon' />
                <div className='sidebar_error_number'>
                    {categoriesError}
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