import { NavLink, useLocation } from 'react-router-dom'
import '../../static/css/profile/profile-sidebar.css'
import { useEffect } from 'react'

const ProfileSidebar = (profile) => {

    const location = useLocation()
    const personalDataPath = '/profile/personal-data'
    const ordersPath = '/profile/orders'
    const bonusesPath = '/profile/bonuses'
    const favoritePath = '/profile/favorite'
    const reviewsPath = '/profile/reviews'

    const pathes = [
        { 'path': '/profile/personal-data', 'title': 'Личные данные' },
        { 'path': '/profile/orders', 'title': 'Заказы' },
        { 'path': '/profile/bonuses', 'title': 'Бонусы' },
        { 'path': '/profile/favorite', 'title': 'Избраное' },
        { 'path': '/profile/reviews', 'title': 'Мои отзывы' },
    ]

    return (
        <ul className='profile_sidebar'>
            <h2 className='profile_sidebar__name'>
                Профиль
            </h2>
            {
                pathes.map((el, ind) => {
                    return <ProfileLink key={ind} title={el.title} path={el.path}/>
                })
            } 
        </ul>
    )
}

const ProfileLink = (props) => {

    const {
        path,
        title 
    } = props

    return (
        <NavLink
            to={path}
            className='profile_sidebar__link'>
            {title}
        </NavLink>
    )
}

export default ProfileSidebar