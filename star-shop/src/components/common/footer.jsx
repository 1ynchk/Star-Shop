import '../../static/css/common/footer.css'
import { FaTelegramPlane } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Footer = (props) => {

    return (
        <div className="footer">
            <div className='footer__wrapper'>
                <div className='footer__container'>
                    <div className='footer__number'>
                        8 800 535 35 35
                    </div>
                    <div className='footer__number_title'>Круглосуточно</div>
                    <div className='footer__social_media_container'>
                        <a href='#' className='footer__social_media'>
                            <FaTelegramPlane />
                        </a>
                        <a href='#' className='footer__social_media'>
                            <FaVk />
                        </a>
                    </div>
                </div>
                <div className='footer__container'>
                    <div className='footer__title'>Контакты</div>
                    <NavLink className='footer__subtitle'>Помощь и ответы на вопросы</NavLink>
                    <NavLink className='footer__subtitle'>Контакты и реквизиты</NavLink>
                    <NavLink className='footer__subtitle'>Обратная связь</NavLink>
                </div>
                <div className='footer__container'>
                    <div className='footer__title'>Книжная сеть</div>
                    <NavLink className='footer__subtitle'>Карта магазинов</NavLink>
                    <NavLink className='footer__subtitle'>Бронирование книг</NavLink>
                    <NavLink className='footer__subtitle'>Подарочные сертификаты</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer