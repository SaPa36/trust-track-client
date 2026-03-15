import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import customer from '../../../assets/customer-top.png';

const Testimonials = () => {
    return (
        <section className=" bg-slate-50 overflow-hidden">
            <img className='mx-auto mb-4' src={customer} alt="Customer" />
            <h2 className="text-4xl font-bold text-[#002B2B] text-center mb-4">
                What our customers are saying
            </h2>
            <p className='text-center mb-4'>Enhance posture, mobility, and well-being effortlessly with Posture Pro.  Achieve
                 proper alignment, <br /> reduce pain, and strengthen your body with ease!</p>

            {/* Put everything inside this relative div */}
            <div data-aos="fade-right" className="relative">
                <Swiper
                    effect={'coverflow'}
                    initialSlide={2}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    // Swiper automatically finds elements with these class names
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper py-10"
                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <SwiperSlide key={i} className="max-w-[400px]">
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl transition-all duration-300">
                                <div className="text-4xl text-[#002B2B] mb-4">"</div>
                                <p className="text-slate-600 mb-6 text-sm">
                                    A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine.
                                </p>
                                <div className="border-t border-dashed border-slate-300 my-4"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#002B2B] rounded-full"></div>
                                    <div>
                                        <h4 className="font-bold text-[#002B2B]">Awlad Hossin</h4>
                                        <p className="text-xs text-slate-400">Senior Product Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* These custom classes are all you need to make it work! */}
                <div className="flex justify-center items-center gap-6 mt-10">
                    <button className="swiper-button-prev-custom p-4 rounded-full border border-slate-200 hover:bg-[#D8EF6A] transition-all">
                        ←
                    </button>
                    <button className="swiper-button-next-custom p-4 rounded-full border border-slate-200 hover:bg-[#D8EF6A] transition-all">
                        →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;