import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={30}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: { slidesPerView: 3 }, // Shows 3 cards on desktop
      }}
      className="mySwiper"
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          {/* Put the Card Code from Section 1 here */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;