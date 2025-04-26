import { NavLink } from 'react-router-dom';
import '../../static/css/common/404-page.css'
import { TbError404 } from "react-icons/tb";

const Page404 = () => {
    
    return (
        <div className="page-404">
            <div className='page-404-container'>
                <TbError404 className="page-404-img" />

                <h2 className="page-404-title">
                    К сожалению, ничего не было найдено по вашему запросу :&#40;
                </h2>

                <NavLink 
                    to='/'
                    className='sidebar_btn active'>
                    На главную страницу
                </NavLink>
            </div>

        </div>
    )
}

export default Page404