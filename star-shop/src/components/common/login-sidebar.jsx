import logo from '../../static/images/logo.png'
import '../../static/css/common/sidebar-login.css'
import { motion, AnimatePresence, LayoutGroup, easeOut } from 'framer-motion'

import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import CommonInputForm from '../bll/inputs';

const SidebarLogin = (props) => {
    const [isRegister, setRegister] = useState(false)
    const { isSidebar, setSidebar } = props
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
                isSidebar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebar(!isSidebar)}
                        className="sidebar_login_wrapper">
                        <motion.div
                            transition={{ delay: 0.2, ease: easeOut }}
                            initial={{ x: 70, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className='sidebar_login'>
                            <div
                                onClick={() => setSidebar(false)}
                                className='sidebar__cross_container'>
                                <IoCloseOutline />
                            </div>

                            <div className='sidebar__container'>
                                <div className='logo'>
                                    <img className='logo-img' alt='logo' src={logo} />
                                </div>
                                <div className='sidebar__title'>
                                    Zvezda
                                </div>
                            </div>

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

                            {
                                !isRegister ? (
                                    <motion.form
                                        key='login'
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}
                                        className='sidebar__login_container'>
                                        <div className='sidebar__login_title'>Вход</div>
                                        <CommonInputForm
                                            rules={emailLogin != null && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailLogin))}
                                            _type='text'
                                            value={emailLogin}
                                            setter={setEmailLogin}
                                            label='Почта'
                                            textWarn='Не валидная почта'
                                            placeholder='Введите почту...'
                                        />
                                        <CommonInputForm
                                            rules={passwordLogin != null && passwordLogin.length < 8}
                                            _type='password'
                                            value={passwordLogin}
                                            setter={setPasswordLogin}
                                            label='Пароль'
                                            textWarn='Пароль должен быть длинее 8 символов'
                                            placeholder='Введите пароль...'
                                        />
                                        <button disabled={!isActiveBtn} className={`sidebar_btn ${isActiveBtn ? 'active' : ''}`}>
                                            Войти
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key='register'
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}
                                        className='sidebar__login_container'>
                                        <div className='sidebar__login_title'>Регистрация</div>
                                        <CommonInputForm
                                            rules={name != null && name.length < 2}
                                            _type='text'
                                            value={name}
                                            setter={setName}
                                            label='Имя'
                                            textWarn='Слишком короткое имя'
                                            placeholder='Введите имя...'
                                        />
                                        <CommonInputForm
                                            rules={surname != null && surname.length < 2}
                                            _type='text'
                                            value={surname}
                                            setter={setSurname}
                                            label='Фамилия'
                                            textWarn='Слишком короткая фамилия'
                                            placeholder='Введите фамилию...'
                                        />
                                        <CommonInputForm
                                            rules={emailRegister != null && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailRegister))}
                                            _type='text'
                                            value={emailRegister}
                                            setter={setEmailRegister}
                                            label='Почта'
                                            textWarn='Не валидная почта'
                                            placeholder='Введите почту...'
                                        />
                                        <CommonInputForm
                                            rules={
                                                (firstPasswordRegister != null
                                                && firstPasswordRegister.length < 8)
                                                || firstPasswordRegister != secondPasswordRegister
                                            }
                                            _type='password'
                                            value={firstPasswordRegister}
                                            setter={setFirstPasswordRegister}
                                            label='Пароль'
                                            textWarn='Пароль должен быть длинее 8 символов и пароли должны совпадать'
                                            placeholder='Введите пароль...'
                                        />
                                        <CommonInputForm
                                            rules={
                                                (secondPasswordRegister != null
                                                && secondPasswordRegister.length < 8)
                                                || firstPasswordRegister != secondPasswordRegister
                                            }
                                            _type='password'
                                            value={secondPasswordRegister}
                                            setter={setSecondPasswordRegister}
                                            label='Повторите пароль'
                                            textWarn='Пароль должен быть длинее 8 символов и пароли должны совпадать'
                                            placeholder='Введите пароль...'
                                        />
                                        <button disabled={!isActiveBtn} className={`sidebar_btn ${isActiveBtn ? 'active' : ''}`}>
                                            Зарегистрироваться
                                        </button>
                                    </motion.form>
                                )
                            }
                        </motion.div>
                    </motion.div>
                )
            }

        </AnimatePresence>

    )
}

export default SidebarLogin