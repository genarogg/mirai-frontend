"use client";
import React from 'react'
import "./sass/_auth.scss";
import { SwiperSlide } from 'swiper/react'
import LokiLogin from '@components/form/formLoki/LokiLogin';
import SwiperLGBackgroud from '@components/swiper/estructura/SwiperLGBackgroud';

import img1 from "@public/authAlana/fashion1.png";
import img2 from "@public/authAlana/fashion2.png";
import img3 from "@public/authAlana/fashion3.png";

interface AuthProps { }

const Auth: React.FC<AuthProps> = () => {

    const data = [
        {
            img: img1.src,

        },
        {
            img: img2.src,

        },
        {
            img: img3.src,

        },
    ];

    return (
        <>
            <div className="auth-loki">
                <div className="container-form">
                    <LokiLogin />
                </div>

                <div className="container-slider">
                    <SwiperLGBackgroud effect='wind'>
                        {data.map((element: any, index: any) => (
                            <SwiperSlide key={index}>
                                <img src={element.img}
                                    alt="img"
                                    className="swiper-gl-image"
                                />

                            </SwiperSlide>
                        ))}
                    </SwiperLGBackgroud>
                </div>
            </div>
        </>
    );
}

export default Auth;