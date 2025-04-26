import { useDispatch, useSelector } from 'react-redux'
import '../../static/css/common/warnings.css'
import { motion, AnimatePresence } from "framer-motion"
import { clearWarning } from '../../store/slices/WarningsSlice'
import { useEffect } from 'react'

const Warnings = () => {

    const dispatch = useDispatch()
    const warning = useSelector(state => state.warnings.warning)

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearWarning()) 
        }, 10000)
    }, [warning])

    return (
        <AnimatePresence>
            {
                warning.length != 0 && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="warnings">
                            {warning}
                    </motion.div>
                )
            }

        </AnimatePresence>

    )
}

export default Warnings