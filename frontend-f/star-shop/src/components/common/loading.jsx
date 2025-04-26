import '../../static/css/common/loading.css'

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="loading-wrapper">
            <div>
                <AiOutlineLoading3Quarters className='loadingscreen__load' />
            </div>
        </div>
    )
}

export default Loading