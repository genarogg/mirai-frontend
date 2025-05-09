"use client"

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { Icon } from "@nano";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

import { regexUrl } from "@fn/regexUtils"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import "./_categoriasSlider.scss";

import { A } from "@nano"

interface CategoriasSliderProps {
    data: any[];
}

const CategoriasSlider: React.FC<CategoriasSliderProps> = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (<>
        <div className="container-slider">
            <div className="internal-container">
                <div className="header-slider">
                    <h2>Categorias</h2>
                    <A href="/categorias">
                        <label htmlFor="#">Ver todas</label>
                        <Icon icon={<MdArrowOutward />} />
                    </A>
                </div>
                <div className="container-info"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Swiper
                        slidesPerView={6}
                        loop={true}
                        direction={'horizontal'}
                        speed={3000}
                        slidesPerGroup={2}

                        centerInsufficientSlides={true}
                        effect={'fade'}
                        simulateTouch={false}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false
                        }}
                        grabCursor={true}
                        modules={[Autoplay, Navigation]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        className="mySwiper"
                        breakpoints={{
                            1500: {
                                slidesPerView: 5,
                                slidesPerGroup: 2,
                            },
                            1000: {
                                slidesPerView: 4,
                                slidesPerGroup: 1,
                            },
                            700: {
                                slidesPerView: 3,
                                slidesPerGroup: 1,
                            },
                            500: {
                                slidesPerView: 2,
                                slidesPerGroup: 1,
                            },
                        }}
                    >
                        {data.map((category, index) => (
                            <SwiperSlide key={index} >
                                <div className="conainer-single-slider">
                                    <A href={`/categorias/${regexUrl(category.name)} `} >
                                        <div className="container-img">
                                            <img src={category.imgSrc} alt="img" />
                                        </div>
                                        <h3>

                                            {category.name}

                                        </h3>
                                    </A>
                                </div>

                            </SwiperSlide>
                        ))}

                        <div className={`swiper-button-prev ${isHovered ? 'fade-in left' : ''}`}>
                            <Icon icon={<IoIosArrowRoundBack />} />
                        </div>
                        <div className={`swiper-button-next ${isHovered ? 'fade-in right' : ''}`}>
                            <Icon icon={<IoIosArrowRoundForward />} />
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    </>);
}

export default CategoriasSlider;