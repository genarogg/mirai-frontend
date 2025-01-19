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
    const data = [
        {
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1503498/34_699F007_NEG190303_3.jpg?v=638602878209600000",
                "https://esprit.vteximg.com.br/arquivos/ids/1518749/34_601F105_BLA114001_0.jpg?v=638665023420970000",
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1503498/34_699F007_NEG190303_3.jpg?v=638602878209600000",
                "https://esprit.vteximg.com.br/arquivos/ids/1518749/34_601F105_BLA114001_0.jpg?v=638665023420970000",
            ],
        },
    ];

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
                {data[0].imgs.map((img, index) => (
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
                {data[0].imgs.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image src={img} alt={`Slide ${index}`} width={360} height={480} className="swiper-gl-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

export default Slider;
