"use client";

import React, { useEffect, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade, Autoplay, } from 'swiper/modules';

/* lib */
// @ts-ignore
import SwiperGL from './lib/swiper-gl.min.js';
import "./lib/_swiper-gl.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import SwiperLGProps from './SwiperProps';

const SwiperLGBackgroud: React.FC<SwiperLGProps> = ({ children, effect = "random", autoplay = {
    delay: 3000, disableOnInteraction: false,
},
    height = "100dvh" }) => {
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiperInstance = swiperRef.current.swiper;
            swiperInstance.on('slideChange', () => {
                const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
                const containerInfo = activeSlide.querySelector('.containerInfo');
                if (containerInfo) {
                    containerInfo.classList.add('fade-in');
                    containerInfo.style.opacity = '1';
                    setTimeout(() => {
                        containerInfo.classList.remove('fade-in');
                    }, 2000);
                }
            });
        }
    }, []);

    return (
        <div className='containerSlider'>
            <Swiper
                ref={swiperRef}
                style={{ height: height }}

                effect="gl"
                onBeforeInit={(swiper: any) => {
                    swiper.params.gl.shader = effect
                }}
                direction={'horizontal'}
                speed={3000}
                autoplay={autoplay}
                loop={true}
                spaceBetween={0}
                touchReleaseOnEdges={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, EffectFade, Pagination, SwiperGL, Autoplay]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </div>
    );
}

export default SwiperLGBackgroud;