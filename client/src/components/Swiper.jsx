import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/Home.css';
import { Navigation, Autoplay } from 'swiper/modules';

export default function SwipperBanner() {
    const slides = [
        {
        id: 1,
        image: 'assets/img/banner-1.png',
        },
        {
        id: 2,
        image: 'assets/img/banner-2.png',
        }
    ];

    return (
        <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            }}
        style={{ height: '400px' }}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        textAlign: 'center',
                        padding: '20px',
                    }}
                    >
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                    </div>
            </SwiperSlide>
            ))}
        </Swiper>
    );
};