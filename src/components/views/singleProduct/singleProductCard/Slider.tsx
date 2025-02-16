import React, { useState } from 'react';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay, EffectFade, Mousewheel, Navigation, Pagination, Thumbs } from 'swiper/modules';

import Image from 'next/image';

import '@components/swiper/estructura/lib/_swiper-gl.scss';

import SwiperGL from '@components/swiper/estructura/lib/swiper-gl.esm';

interface SliderProps {
    producto?: any;
}

const Slider: React.FunctionComponent<SliderProps> = ({ producto }) => {


    const imgs = producto.images;

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className="slider-container">

            {/* Thumbs Slider */}
            <Swiper
                className="thumbs-swiper"

                onSwiper={setThumbsSwiper}
                direction="vertical"
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
            >
                {imgs.map((img: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={img}
                            alt={`Thumbnail ${index}`}
                            width={87}
                            height={132} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Main Slider */}
            <Swiper
                style={{ height: 480, width: 360 }}
                id="slider-producto-main"
                effect="gl"
                onBeforeInit={(swiper: any) => {
                    swiper.params.gl.shader = "shutters";
                }}
                direction="horizontal"
                speed={1000}
                // autoplay={{
                //     delay: 7000,
                //     disableOnInteraction: false,
                // }}

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
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Mousewheel, EffectFade, Pagination, SwiperGL, Autoplay, Thumbs]}
                className="mySwiper lg-producto-single"
            >
                {imgs.map((img: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Image src={img} alt={`Slide ${index}`} width={360} height={480} className="swiper-gl-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

export default Slider;
