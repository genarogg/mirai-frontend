"use client";
import React from 'react';
import "./sass/_sliderBackgroud.scss";
import { SwiperSlide } from 'swiper/react';
import { A, Icon } from "@nano";

import { IoIosArrowForward } from "react-icons/io";

import SwiperLGBackgroud from '@components/swiper/estructura/SwiperLGBackgroud';
import BtnNormalBasic from "@components/btns/basic/btnNormalBasic";


interface SliderBackgroundProps { data: any, effect: any, id: string }

const SliderBackground: React.FC<SliderBackgroundProps> = ({ data, effect, id }) => {

    return (
        <div className='containerSliderLg bg'>
            <SwiperLGBackgroud effect={effect} id={id} >
                {data.map((element: any, index: any) => (
                    <SwiperSlide key={index}>
                        <img src={element.img}
                            alt="img"
                            className="swiper-gl-image"
                        />
                        {element.info && (
                            <div className="containerInfo" key={index}>
                                <div className="content">
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
                        )}
                    </SwiperSlide>
                ))}
            </SwiperLGBackgroud>
        </div>
    );
}

export default SliderBackground