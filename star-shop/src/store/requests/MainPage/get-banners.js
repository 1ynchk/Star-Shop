import axios from "axios";

import { host } from "../host";

export const fetchGetBanners = async (props) => {
    const {
        setter,
        setterLoading,
    } = props 

    setterLoading(true)

    try {
        const response = await axios.get(
            `${host}/api_main/get-banners/`,
            {withCredentials: true}
        )

        return setter(response.data.result)
    } catch (error) {
        const errorCode = +(error.message.slice(-3))
        console.log(`Произошла ошибка ${errorCode}`) 
    } finally {
        setterLoading(false)
    }
}