import { motion } from 'framer-motion'
import { RxCross1 } from "react-icons/rx";
import { GiConfirmed } from "react-icons/gi";

import CommonInputForm from '../../bll/inputs';
import { fetchRegister } from '../../../store/requests/Users/register';
import { useSelector } from 'react-redux';
import { clearState } from '../../../store/slices/UsersSlice';
import Loading from '../loading';

const Register = (props) => {

    const registrationError = useSelector(state => state.users.registrationError)
    const isRegistred = useSelector(state => state.users.isRegistred)

    const {
        name,
        setName,
        surname,
        setSurname,
        emailRegister,
        setEmailRegister,
        firstPasswordRegister,
        setFirstPasswordRegister,
        secondPasswordRegister,
        setSecondPasswordRegister,
        isActiveBtn,
        dispatch,
        loading,
        setRegister
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchRegister(
            {
                'name': name,
                'surname': surname,
                'email': emailRegister,
                'password': firstPasswordRegister
            }
        ))
    }

    return (
        <>
            {
                !isRegistred && !loading && registrationError.length == 0 && (
                    <motion.form
                        key='register'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}
                        onSubmit={(e) => handleSubmit(e)}
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

            {
                isRegistred && !loading && registrationError.length == 0 && (
                    <motion.div
                        className='sidebar__request_error_container'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <GiConfirmed className='request_error_img' />
                        <div className='request_error_value'>
                            Вы зарегистрировались!
                        </div>
                        <button
                            onClick={() => {
                                dispatch(clearState())
                                setRegister(false)
                                setName(null)
                                setSurname(null)
                                setEmailRegister(null)
                                setFirstPasswordRegister(null)
                                setSecondPasswordRegister(null)
                            }}
                            className='request_error_btn'>
                            К входу
                        </button>
                    </motion.div>
                )
            }

            {
                loading && (
                    <div className='sidebar__loading_container'>
                        <Loading />
                    </div>

                )
            }

            {
                registrationError.length != 0 && (
                    <motion.div
                        className='sidebar__request_error_container'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <RxCross1 className='request_error_img' />
                        <div className='request_error_value'>
                            {registrationError}
                        </div>
                        <button
                            onClick={() => dispatch(clearState())}
                            className='request_error_btn'>
                            К регистрации
                        </button>
                    </motion.div>
                )
            }
        </>
    )
}

export default Register