
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const StuffMainPage = (props) => {

    const {
        label,
        list
    } = props

    return (
        <div className='stuffmainpage'>
            <div className='stuffmainpage__label'>{label}</div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={5}
                loop={true}
                className='stuffmainpage__swiper'
            >

            </Swiper>
        </div>

    )
}

export default StuffMainPage