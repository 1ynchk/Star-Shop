import logo from '../../../static/images/logo.png'
import '../../../static/css/common/sidebar-login.css'
import { motion, AnimatePresence, LayoutGroup, easeOut } from 'framer-motion'
import { RxCross1 } from "react-icons/rx";

import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useDispatch, useSelector } from 'react-redux';

const SidebarLogin = (props) => {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.users.loading)

    const [isRegister, setRegister] = useState(false)
    const { isSidebarLogin, setSidebarLogin } = props
    const [isActiveBtn, setActiveBtn] = useState(false)

    const [emailLogin, setEmailLogin] = useState(null)
    const [passwordLogin, setPasswordLogin] = useState(null)

    const [emailRegister, setEmailRegister] = useState(null)
    const [firstPasswordRegister, setFirstPasswordRegister] = useState(null)
    const [secondPasswordRegister, setSecondPasswordRegister] = useState(null)
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)

    useEffect(() => {

        if (!isRegister) {
            if (emailLogin == null
                || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailLogin))
                || passwordLogin == null || passwordLogin.length < 8) {
                setActiveBtn(false)
            } else {
                setActiveBtn(true)
            }
        } else {
            if (emailRegister == null
                || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRegister))
                || firstPasswordRegister == null || secondPasswordRegister == null
                || firstPasswordRegister.length < 8 || secondPasswordRegister.length < 8
                || name == null || surname == null || name.length < 2 || surname.length < 2
                || firstPasswordRegister != secondPasswordRegister) {
                setActiveBtn(false)
            } else {
                setActiveBtn(true)
            }
        }

    }, [
        emailLogin,
        passwordLogin,
        name,
        surname,
        secondPasswordRegister,
        firstPasswordRegister,
        emailRegister])

    return (
        <AnimatePresence exitBeforeEnter>
            {
                isSidebarLogin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarLogin(!isSidebarLogin)}
                        className="sidebar_login_wrapper">
                        <motion.div
                            transition={{ delay: 0.2, ease: easeOut }}
                            initial={{ x: 70, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className='sidebar_login'>
                            <IoCloseOutline
                                onClick={() => setSidebarLogin(false)}
                                className='sidebar__cross_container'
                            />

                            <div className='sidebar__container'>
                                <div className='logo'>
                                    <img className='logo-img' alt='logo' src={logo} />
                                </div>
                                <div className='sidebar__title'>
                                    Zvezda
                                </div>
                            </div>

                            <LayoutBtns
                                setRegister={setRegister}
                                isRegister={isRegister} />

                            {
                                !isRegister ? (
                                    <Login
                                        emailLogin={emailLogin}
                                        setEmailLogin={setEmailLogin}
                                        passwordLogin={passwordLogin}
                                        setPasswordLogin={setPasswordLogin}
                                        isActiveBtn={isActiveBtn}
                                        dispatch={dispatch}
                                        loading={loading}
                                    />
                                ) : (
                                    <Register
                                        name={name}
                                        setName={setName}
                                        surname={surname}
                                        setSurname={setSurname}
                                        emailRegister={emailRegister}
                                        setEmailRegister={setEmailRegister}
                                        firstPasswordRegister={firstPasswordRegister}
                                        setFirstPasswordRegister={setFirstPasswordRegister}
                                        secondPasswordRegister={secondPasswordRegister}
                                        setSecondPasswordRegister={setSecondPasswordRegister}
                                        isActiveBtn={isActiveBtn}
                                        dispatch={dispatch}
                                        loading={loading}
                                        setRegister={setRegister}
                                    />
                                )
                            }
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence >
    )
}

const LayoutBtns = (props) => {

    const {
        isRegister,
        setRegister
    } = props

    return (
        <LayoutGroup>
            <div className='sidebar__container column'>
                <motion.div
                    layoutId='sidebar-active-background'
                    className='button-bg'
                    animate={{ left: !isRegister ? '0%' : '50%' }}
                >
                </motion.div>
                <motion.div
                    onClick={() => setRegister(false)}
                    className={`sidebar__subtitle ${!isRegister ? 'active' : ''}`}>
                    Войти
                </motion.div>
                <motion.div
                    onClick={() => setRegister(true)}
                    className={`sidebar__subtitle ${isRegister ? 'active' : ''}`}>
                    Зарегистрироваться
                </motion.div>
            </div>
        </LayoutGroup>
    )
}

export default SidebarLogin