import '../../static/css/profile/profile-favorite.css'
import { motion } from 'framer-motion'
import ProfileSectionVars from '../bll/framer-motion/profile-sections'
import { fetchProfile } from './../../store/requests/Users/profile-favorite';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ProfileFavorite = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

    return (
        <motion.div
            initial='initial'
            animate='visible'
            variants={ProfileSectionVars}>
            <h3 className="profile_root__section_name">Избранное</h3>

        </motion.div>
    )
}

export default ProfileFavorite