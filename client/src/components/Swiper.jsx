import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../css/Home.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function SwipperBanner() {
    const slides = [
        {
        id: 1,
        image: 'https://via.placeholder.com/800x400?text=Welcome+to+Quipper+School',
        title: 'Welcome to Quipper School',
        description: 'Your journey to knowledge starts here.',
        },
        {
        id: 2,
        image: 'https://via.placeholder.com/800x400?text=Explore+Our+Courses',
        title: 'Explore Our Courses',
        description: 'Find the right course for you.',
        },
        {
        id: 3,
        image: 'https://via.placeholder.com/800x400?text=Join+Our+Community',
        title: 'Join Our Community',
        description: 'Connect with learners and educators.',
        },
        {
        id: 4,
        image: 'https://via.placeholder.com/800x400?text=Achieve+Your+Goals',
        title: 'Achieve Your Goals',
        description: 'Unlock your potential with us.',
        },
    ];

    return (
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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