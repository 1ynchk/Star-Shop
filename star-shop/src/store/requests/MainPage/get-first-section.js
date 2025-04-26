import axios from "axios";

import { host } from "../host";

export const fetchGetFirstSection = async (props) => {
    const {
        setter,
        setterLoading,
        setterError
    } = props 

    setterLoading(true)

    try {
        const response = await axios.get(
            `${host}/api_main/get-first-section/`,
            {withCredentials: true}
        )

        return setter(response.data.result)
    } catch (error) {
        const errorCode = +(error.message.slice(-3))
        setterError(errorCode)
        console.log(`Произошла ошибка ${errorCode}`) 
    } finally {
        setterLoading(false)
    }
}