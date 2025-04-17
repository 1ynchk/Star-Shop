import '../../static/css/profile/profile-personal-data.css'
import { motion } from "framer-motion"

import ProfileSectionVars from './../bll/framer-motion/profile-sections';
import CommonInputForm from "../bll/inputs";
import { useState } from "react";

const ProfilePersonalData = () => {
    const [isActiveBtn, setActiveBtn] = useState(false)
    const [surname, setSurname] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [firstPassword, setFirstPassword] = useState(null)
    const [secondPassword, setSecondPassword] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <motion.div
            initial='initial'
            animate='visible'
            variants={ProfileSectionVars}
            className="profile_personal_data">
            <h3 className="profile_root__section_name">Личные данные</h3>

            <form
                className='profile_personal_data__form'
                onSubmit={handleSubmit}>
                <h4 className="profile_root__section_subtitle">Основная информация</h4>
                <div className="profile_root__container">
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
                        rules={name != null && name.length < 2}
                        _type='text'
                        value={name}
                        setter={setName}
                        label='Имя'
                        textWarn='Слишком короткое имя'
                        placeholder='Введите имя...'
                    />
                </div>
                <h4 className="profile_root__section_subtitle">Данные аккаунта</h4>
                <div className="profile_root__container">
                    <CommonInputForm
                        rules={email != null && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))}
                        _type='text'
                        value={email}
                        setter={setEmail}
                        label='Почта'
                        textWarn='Не валидная почта'
                        placeholder='Введите почту...'
                    />
                </div>
                <div className="profile_root__container">
                    <CommonInputForm
                        rules={
                            (firstPassword != null
                                && firstPassword.length < 8)
                            || firstPassword != secondPassword
                        }
                        _type='password'
                        value={firstPassword}
                        setter={setFirstPassword}
                        label='Пароль'
                        textWarn='Пароль должен быть длинее 8 символов и пароли должны совпадать'
                        placeholder='Введите пароль...'
                    />
                    <CommonInputForm
                        rules={
                            (secondPassword != null
                                && secondPassword.length < 8)
                            || firstPassword != secondPassword
                        }
                        _type='password'
                        value={secondPassword}
                        setter={setSecondPassword}
                        label='Повторите пароль'
                        textWarn='Пароль должен быть длинее 8 символов и пароли должны совпадать'
                        placeholder='Введите пароль...'
                    />
                </div>
                <div className="profile_personal_data__btns">
                    <button disabled={!isActiveBtn} className={`sidebar_btn ${isActiveBtn ? 'active' : ''}`}>
                        Принять
                    </button>
                </div>

            </form>

        </motion.div>
    )
}

export default ProfilePersonalData