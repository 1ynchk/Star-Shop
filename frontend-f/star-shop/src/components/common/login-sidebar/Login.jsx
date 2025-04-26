import { motion } from 'framer-motion'

import CommonInputForm from '../../bll/inputs';
import { RxCross1 } from "react-icons/rx";
import { clearState } from '../../../store/slices/UsersSlice';
import { useSelector } from 'react-redux';
import { fetchLogin } from '../../../store/requests/Users/login';
import Loading from '../loading';

const Login = (props) => {

    const loginError = useSelector(state => state.users.loginError)

    const {
        emailLogin,
        setEmailLogin,
        passwordLogin,
        setPasswordLogin,
        isActiveBtn,
        dispatch,
        loading
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchLogin({ 'email': emailLogin, 'password': passwordLogin }))
    }

    return (
        <>
            {
                !loading && loginError.length == 0 && (
                    <motion.form
                        key='login'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5, transition: { duration: 0.3 } }}
                        onSubmit={(e) => handleSubmit(e)}
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
                loginError.length != 0 && (
                    <motion.div
                        className='sidebar__request_error_container'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <RxCross1 className='request_error_img' />
                        <div className='request_error_value'>
                            {loginError}
                        </div>
                        <button
                            onClick={() => dispatch(clearState())}
                            className='request_error_btn'>
                            К входу
                        </button>
                    </motion.div>
                )
            }
        </>

    )
}

export default Login