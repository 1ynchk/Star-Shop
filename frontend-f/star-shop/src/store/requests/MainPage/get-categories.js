import axios from "axios";

import { host } from "../host";

export const fetchGetCategories = async (props) => {
    const {
        setter,
        setterLoading,
        setterError
    } = props

    setterLoading(true)

    try {
        const response = await axios.get(
            `${host}/api_products/get-categories/`,
            { withCredentials: true }
        )
        return setter(response.data.result)
    } catch (error) {
        const errorCode = +(error.message.slice(-3))
        setterError(`${errorCode}`)
    } finally {
        setterLoading(false)
    }
}