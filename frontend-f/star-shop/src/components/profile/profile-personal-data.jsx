import '../../static/css/profile/profile-personal-data.css'
import { motion } from "framer-motion"

import ProfileSectionVars from '../bll/framer-motion/profile-sections';
import CommonInputForm from "../bll/inputs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProfileInfo } from '../../store/requests/Users/profile-info';
import { fetchEditProfileInfo } from '../../store/requests/Users/edit-profile-info';

const ProfilePersonalData = () => {

    const dispatch = useDispatch()

    const [isActiveBtn, setActiveBtn] = useState(false)
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [firstPassword, setFirstPassword] = useState(null)
    const [secondPassword, setSecondPassword] = useState(null)

    const profileInfo = useSelector(state => state.users.profileInfo)
    const loading = useSelector(state => state.users.loading)

    useEffect(() => {
        dispatch(fetchGetProfileInfo())
    }, [])

    useEffect(() => {
        if (profileInfo) {
            setName(profileInfo.name || '');
            setSurname(profileInfo.surname || '');
            setEmail(profileInfo.email || '');
        }
    }, [profileInfo])

    const isBasicInfoValid = (
        surname && surname.length >= 2 &&
        name && name.length >= 2 &&
        email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )

    const isBasicInfoChanged = (
        !profileInfo ||
        name !== profileInfo?.name ||
        surname !== profileInfo?.surname ||
        email !== profileInfo?.email
    )

    const isPasswordValid = (
        firstPassword === null &&
        secondPassword === null
    ) || (
            firstPassword &&
            secondPassword &&
            firstPassword.length >= 8 &&
            firstPassword === secondPassword)

    useEffect(() => {
        const isPasswordChanged = firstPassword !== null;

        setActiveBtn(
            isBasicInfoValid && 
            (isBasicInfoChanged || isPasswordChanged) && 
            (!isPasswordChanged || isPasswordValid) 
        )
    }, [surname, name, email, firstPassword, secondPassword, profileInfo])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: name,
            surname: surname,
            email: email
        }

        if ((firstPassword != null && secondPassword != null)
            && firstPassword == secondPassword ) {
            data.password = firstPassword
        }

        dispatch(fetchEditProfileInfo(data))
        setFirstPassword(null)
        setSecondPassword(null)
        setActiveBtn(false)
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
                    {
                        loading ? (
                            <div className="loading_container empty_loading input_container">
                                <div className='shiny empty_loading'></div>
                            </div>
                        ) : (
                            <CommonInputForm
                                rules={surname.length < 2}
                                _type='text'
                                value={surname}
                                setter={setSurname}
                                label='Фамилия'
                                textWarn='Слишком короткая фамилия'
                                placeholder='Введите фамилию...'
                            />
                        )
                    }

                    {
                        loading ? (
                            <div className="loading_container empty_loading input_container">
                                <div className='shiny empty_loading'></div>
                            </div>
                        ) : (
                            <CommonInputForm
                                rules={name.length < 2}
                                _type='text'
                                value={name}
                                setter={setName}
                                label='Имя'
                                textWarn='Слишком короткое имя'
                                placeholder='Введите имя...'
                            />
                        )
                    }


                </div>
                <h4 className="profile_root__section_subtitle">Данные аккаунта</h4>
                <div className="profile_root__container">
                    {
                        loading ? (
                            <div className="loading_container empty_loading input_container">
                                <div className='shiny empty_loading'></div>
                            </div>
                        ) : (
                            <CommonInputForm
                                rules={email.length == 0 && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))}
                                _type='text'
                                value={email}
                                setter={setEmail}
                                label='Почта'
                                textWarn='Не валидная почта'
                                placeholder='Введите почту...'
                            />
                        )
                    }

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