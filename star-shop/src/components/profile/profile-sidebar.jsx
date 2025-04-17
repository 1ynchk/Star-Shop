import { NavLink } from 'react-router-dom'
import '../../static/css/profile/profile-sidebar.css'

const ProfileSidebar = (profile) => {

    return (
        <ul className='profile_sidebar'>
            <h2 className='profile_sidebar__name'>
                Профиль
            </h2>
            <NavLink 
                to='/profile/personal-data'
                className='profile_sidebar__link'>
                Личные данные
            </NavLink>
            <NavLink 
                to='/profile/orders'
                className='profile_sidebar__link'>
                Заказы
            </NavLink>
            <NavLink 
                to='/profile/bonuses'
                className='profile_sidebar__link'>
                Бонусы
            </NavLink>
            <NavLink 
                to='/profile/favorite'
                className='profile_sidebar__link'>
                Избранное
            </NavLink>
            <NavLink 
                to='/profile/reviews'
                className='profile_sidebar__link'>
                Мои отзывы 
            </NavLink>
        </ul>
    )
}

export default ProfileSidebar