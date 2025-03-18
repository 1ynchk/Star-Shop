import logo from '../../static/images/logo.png'
import '../../static/css/common/sidebar-login.css'
import { motion, AnimatePresence, easeOut } from 'framer-motion'

import { IoCloseOutline } from "react-icons/io5";
import { useState } from 'react';

const SidebarLogin = (props) => {
    const [isRegister, setRegister] = useState(false)
    const { isSidebar, setSidebar } = props

    return (
        isSidebar && (
            <AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebar(!isSidebar)}
                    className="sidebar_login_wrapper">
                    <motion.div
                        transition={{ delay: 0.2, ease: easeOut }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 25, opacity: 0 }}
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

                        <div className='sidebar__container column'>
                            <div className='sidebar__subtitle active'>Войти</div>
                            <div className='sidebar__subtitle'>Зарегистрироваться</div>
                        </div>
                    </motion.div>
                </motion.div>

            </AnimatePresence>
        )

    )
}

export default SidebarLogin