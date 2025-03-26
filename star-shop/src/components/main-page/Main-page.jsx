import '../../static/css/mainpage/mainpage.css'

import Banners from "./Banners"
import StuffMainPage from './StuffMainPage'

const MainPage = (props) => {
    return (
        <div className="mainpage">
            <Banners/>
            {/* <StuffMainPage label='Книги' /> */}
        </div>
    )
}

export default MainPage