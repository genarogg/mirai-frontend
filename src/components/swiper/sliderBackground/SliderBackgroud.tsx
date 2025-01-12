"use client";
import React from 'react';
import "./sass/_sliderBackgroud.scss";
import { SwiperSlide } from 'swiper/react';
import { A, Icon } from 'nanify';

import { IoIosArrowForward } from "react-icons/io";

import SwiperLGBackgroud from '@components/swiper/estructura/SwiperLGBackgroud';
import BtnNormalBasic from "@components/btns/basic/btnNormalBasic";


interface SliderBackgroundProps { data: any, effect: any }

const SliderBackground: React.FC<SliderBackgroundProps> = ({ data, effect }) => {

    return (
        <div className='containerSliderLg bg'>
            <SwiperLGBackgroud effect={effect} >
                {data.map((element: any, index: any) => (
                    <SwiperSlide key={index}>
                        <img src={element.img}
                            alt="img"
                            className="swiper-gl-image"
                        />
                        <div className="containerInfo" key={index}>
                            <div className="content center">
                                <h2>{element.info.title}</h2>
                                <p>{element.info.description}</p>
                                <BtnNormalBasic className="btnNormalBasic" >
                                    <A href={element.info.btn.link}>
                                        {element.info.btn.text}
                                        <Icon icon={<IoIosArrowForward />} />
                                    </A>
                                </BtnNormalBasic>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperLGBackgroud>
        </div>
    );
}

export default SliderBackground