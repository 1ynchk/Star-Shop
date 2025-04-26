import '../../static/css/common/loading.css'

import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='loadingscreen'>
                    <AiOutlineLoading3Quarters className='loadingscreen__load'/>
            </motion.div>
        </AnimatePresence>
    )
}

export default LoadingScreen