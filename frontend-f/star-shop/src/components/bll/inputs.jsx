import { motion, AnimatePresence } from 'framer-motion'

import { AiTwotoneEye } from "react-icons/ai";
import '../../static/css/bll/inputs.css'
import { useRef, useState } from 'react';

const InputWarning = (props) => {

    const {
        text
    } = props

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ ease: 'easeInOut' }}
            className='input_warning'
        >
            {text}
        </motion.div>
    )
}

const CommonInputForm = (props) => {

    const {
        label,
        placeholder,
        value,
        setter,
        rules,
        textWarn,
        _type
    } = props


    const inputRef = useRef(null)
    const [inputType, setInputType] = useState(props._type || 'text')

    const concealPassword = () => {
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'))
    }

    return (
        <div className='input_container'>
            <label className='input_label'>{label}</label>
            <input
                ref={inputRef}
                value={value == null ? '' : value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className='common_input'
                type={inputType} />
            <AnimatePresence>
                {rules && <InputWarning text={textWarn} />}
            </AnimatePresence>
            {
                _type == 'password' && <AiTwotoneEye
                    onClick={() => concealPassword()}
                    className='conceal_password' />
            }
        </div>
    )
}

export default CommonInputForm