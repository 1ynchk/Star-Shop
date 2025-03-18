import '../../static/css/common/header.css'
import logo from '../../static/images/logo.png'
import { IoIosSearch } from "react-icons/io";

const Header = (props) => {
    const { isSidebar, setSidebar } = props

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <header className='header'>
            <div className='header__wrapper'>
                <div className='header__container'>
                    <nav className='header__element'>Магазины</nav>
                    <nav className='header__element'>Оплата и доставка</nav>
                    <nav className='header__element'>Бонусы</nav>
                </div>
                <div className='header__container'>
                    <nav className='header__element'>8 800 535 35 35</nav>
                    <nav className='header__element'>Помощь</nav>
                </div>
            </div>
            <div className='header__wrapper'>
                <div className='logo'>
                    <img className='logo-img' alt='logo' src={logo} />
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='header__search_container'>
                    <button className='header__catalog'>
                        Каталог
                    </button>
                    <div className='header_search_subcontainer'>
                        <input
                            placeholder='Найти товар'
                            className='header__search' />
                        <button
                            type='submit'
                            className='header__search_btn'>
                            <IoIosSearch className='search_btn_image' />
                        </button>
                    </div>
                </form>

                <div className='header__container'>
                    <div
                        onClick={() => setSidebar(!isSidebar)}
                        className='header__subcontainer'>
                        <img alt='profile' />
                        <div className='header__subtitle'>Профиль</div>
                    </div>
                    <div className='header__subcontainer'>
                        <img alt='profile' />
                        <div className='header__subtitle'>Избраное</div>
                    </div>
                    <div className='header__subcontainer'>
                        <img alt='profile' />
                        <div className='header__subtitle'>Корзина</div>
                    </div>
                </div>
            </div>

            <div className='header__wrapper'>
                <div className='header__container full-width'>
                    <nav className='header__element'>Хиты продаж</nav>
                    <nav className='header__element'>Акции</nav>
                    <nav className='header__element'>Школьная пора</nav>
                    <nav className='header__element'>Сувениры</nav>
                    <nav className='header__element'>Канцелярия</nav>

                </div>
            </div>
        </header>
    )
}

export default Header