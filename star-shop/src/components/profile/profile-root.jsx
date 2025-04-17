import '../../static/css/profile/profile-root.css'
import ProfileSidebar from "./profile-sidebar"

import { Outlet } from 'react-router-dom'

const ProfileRoot = () => {
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