"use client"

import React from 'react';
import "./sass/_cardProductoAlana.scss"
import { A, MenuToolTip, Icon } from "@nano"
import { SwiperSlide } from 'swiper/react'
import SwiperLGTwoElements from '@components/swiper/estructura/SwiperLGTwoElements'

import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

import { FaRegEye } from "react-icons/fa6";
import { MdOutlineCompareArrows } from "react-icons/md";

import Image from 'next/image';

interface CardProductoAlanaProps {
    data: any
    id: string
}

const CardProductoAlana: React.FC<CardProductoAlanaProps> = ({ data, id }) => {

    const quickActions = [
        { items: ['Comparar'], icon: <MdOutlineCompareArrows /> },
        { items: ['Vista Rapida'], icon: <FaRegEye /> },
        { items: ['Deseado'], icon: <FaRegHeart /> },
        { items: ['Comprar'], icon: <FiShoppingBag /> },
    ];

    return (
        <div className="card-alana-producto">
            <div className="container-img">
                <A href={data.url}>
                    <SwiperLGTwoElements
                        effect='morph-y'
                        height="460px"
                        width='360px'
                        id={id}
                    >
                        {data.imgs.map((img: any, colorIndex: any) => (
                            <SwiperSlide key={colorIndex}>
                                <Image
                                    src={img}
                                    className="swiper-gl-image"
                                    width={360}
                                    height={460}
                                    alt={data.titulo}
                                />
                                {/* <img

                                /> */}
                            </SwiperSlide>
                        ))}
                    </SwiperLGTwoElements>
                </A>
                <nav className="quik-actions">
                    <ul>
                        {quickActions.map((action, index) => (
                            <li key={index}>
                                <MenuToolTip
                                    interactive={false}
                                    items={action.items}
                                    placement="top"
                                    classNameTooltip="card-producto-alana-quik-actions-tooltip"
                                >
                                    <Icon icon={action.icon} />
                                </MenuToolTip>
                            </li>
                        ))}
                    </ul>
                </nav>
                <nav className="tallas">
                    <ul>
                        {data.tallas.map((talla: any, index: any) => (
                            <li key={index}>
                                <A href={`${data.url}#talla=${talla}`} className="talla">
                                    {talla}
                                </A>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="container-info">
                <h3>{data.titulo}</h3>
                <p>${data.precio}</p>
                <div className="colores">
                    {data.colores.map((color: any, colorIndex: any) => (
                        <span
                            key={colorIndex}
                            className="color-product"

                        >

                            <span style={{ backgroundColor: color }}></span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardProductoAlana;