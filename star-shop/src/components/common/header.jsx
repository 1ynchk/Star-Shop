import '../../static/css/common/header.css'
import logo from '../../static/images/logo.png'
import { IoIosSearch } from "react-icons/io";
import { IoIosExit } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useDebugValue, useEffect, useState } from 'react';
import { fetchLogout } from './../../store/requests/Users/logout';
import { NavLink } from 'react-router-dom'

import { fetchGetMainCategories } from './../../store/requests/MainPage/get-main-categories';


const Header = (props) => {

    const dispatch = useDispatch()

    const isLogin = useSelector(state => state.users.isLogin)
    const checkLoginLoading = useSelector(state => state.users.checkLoginLoading)
    const mainCategories = useSelector(state => state.mainpage.mainCategories)
    const mainCategoriesLoading = useSelector(state => state.mainpage.mainCategoriesLoading)

    const {
        isSidebarLogin,
        setSidebarLogin,
        isSidebarCatalog,
        setSidebarCatalog
    } = props

    useEffect(() => {
        dispatch(fetchGetMainCategories())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <header className='header'>
            <div className='header__wrapper'>
                <div className='header__container'>
                    <nav className='header__element'>Магазины</nav>
                    <nav className='header__element'>Оплата и доставка</nav>
                    <nav className='header__element'>Бонусы</nav>
                </div>
                <div className='header__container'>
                    <nav className='header__element'>8 800 535 35 35</nav>
                    <nav className='header__element'>Помощь</nav>
                </div>
            </div>
            <div className='header__wrapper'>
                <NavLink
                    to={'/'}
                    className='logo'>
                    <img className='logo-img' alt='logo' src={logo} />
                </NavLink>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='header__search_container'>
                    <button
                        onClick={() => setSidebarCatalog(!isSidebarCatalog)}
                        className='header__catalog'>
                        Каталог
                    </button>
                    <div className='header_search_subcontainer'>
                        <input
                            placeholder='Найти товар'
                            className='header__search' />
                        <button
                            type='submit'
                            className='header__search_btn'>
                            <IoIosSearch className='search_btn_image' />
                        </button>
                    </div>
                </form>

                <HeaderUsersPart
                    isSidebarLogin={isSidebarLogin}
                    setSidebarLogin={setSidebarLogin}
                    isLogin={isLogin}
                    checkLoginLoading={checkLoginLoading}
                />
            </div>

            <div className='header__wrapper'>
                <div className='header__container full-width'>
                    {
                        mainCategoriesLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='loading_container empty_loading'>
                                <div className='shiny empty_loading'></div>
                            </motion.div>
                        )
                    }
                    {
                        !mainCategoriesLoading && mainCategories.map((el, ind) => {
                            return (
                                <NavLink
                                    key={ind}
                                    className='header__element header_weight'
                                >
                                    {el.cat.name}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </header>
    )
}

const HeaderUsersPart = (props) => {

    const [isProfileActive, setProfileActive] = useState(false)
    const dispatch = useDispatch()

    const {
        isSidebarLogin,
        setSidebarLogin,
        isLogin,
        checkLoginLoading
    } = props

    const arrayCheckLogin = [
        { 'title': 'Войти' },
        { 'title': 'Избранное' },
        { 'title': 'Корзина' }
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.profile_drop_list_container') &&
                !e.target.closest('.header__subcontainer.loggined_subcontainer')) {
                setProfileActive(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className='header__container'>
            {
                !isLogin && !checkLoginLoading && (
                    <motion.div
                        onClick={() => setSidebarLogin(!isSidebarLogin)}
                        className='header__subcontainer'>
                        <CgProfile className='header__img' />
                        <div className='header__subtitle'>Войти</div>
                        <div className='shiny'></div>
                    </motion.div>
                )
            }

            {
                isLogin && !checkLoginLoading && (
                    <motion.div
                        onClick={() => setProfileActive(!isProfileActive)}
                        className='header__subcontainer loggined_subcontainer'>
                        <CgProfile className='header__img' />
                        <div className='header__subtitle'>Профиль</div>
                        <div className='shiny'></div>
                    </motion.div>
                )
            }

            {
                isLogin && !checkLoginLoading && (
                    <NavLink
                        to='/profile/favorite'
                        className='header__subcontainer'>
                        <MdOutlineFavoriteBorder className='header__img' />
                        <div className='header__subtitle'>Избраное</div>
                        <div className='shiny'></div>
                    </NavLink>
                )
            }

            {
                !isLogin && !checkLoginLoading && (
                    <button
                        onClick={() => setSidebarLogin(true)}
                        className='header__subcontainer'>
                        <MdOutlineFavoriteBorder className='header__img' />
                        <div className='header__subtitle'>Избраное</div>
                        <div className='shiny'></div>
                    </button>
                )
            }

            {
                !checkLoginLoading && (
                    <div className='header__subcontainer'>
                        <IoCartOutline className='header__img' />
                        <div className='header__subtitle'>Корзина</div>
                        <div className='shiny'></div>
                    </div>
                )
            }
            {
                checkLoginLoading && (
                    arrayCheckLogin.map((el, ind) => {
                        return (
                            <motion.div
                                key={ind}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='header__subcontainer empty_loading'>
                                <div className='header__img empty_loading'> </div>
                                <div className='header__subtitle'>{el.title}</div>
                                <div className='shiny empty_loading'></div>
                            </motion.div>
                        )
                    })
                )
            }

            <AnimatePresence>
                {
                    isProfileActive && isLogin && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className='profile_drop_list_container'>
                            <NavLink
                                to='/profile/personal-data'
                                onClick={() => setProfileActive(false)}
                                className='profile_el_container'>
                                <CgProfile className='profile_el_img' />
                                <div className='profile_el_text'>Профиль</div>
                            </NavLink>
                            <li
                                onClick={() => dispatch(fetchLogout())}
                                className='profile_el_container'>
                                <IoIosExit className='profile_el_img' />
                                <div className='profile_el_text'>Выйти</div>
                            </li>
                        </motion.ul>
                    )
                }
            </AnimatePresence>

        </div>
    )
}

export default Header