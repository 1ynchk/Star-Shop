import '../../static/css/profile/profile-root.css'
import ProfileSidebar from "./profile-sidebar"

import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProfileRoot = () => {

    const navigate = useNavigate()

    const isLogin = useSelector(state => state.users.isLogin)
    const checkLoginLoading = useSelector(state => state.users.checkLoginLoading)   

    useEffect(() => {
        if (checkLoginLoading === false && isLogin === false) {
            navigate('/');
        }
    }, [isLogin, checkLoginLoading])

    return (
        <div className="profile_root">
            <ProfileSidebar />
            <div className='profile_root__outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileRoot