import React, { useState } from 'react'
import Layout from '@components/layout/public/Layout';
import SliderBackground from '@components/swiper/sliderBackground/SliderBackgroud';
import CategoriasSlider from '@components/sections/categoriasSlider/CategoriasSlider';

import MentorBasico from '@components/mentorHome/MentorBasico';

import DinamicZone from '@components/dinamicSection/DinamicZone';

import "./sass/_home.scss";

import img1 from "@public/mainSliderHome/slider1.jpg";
import img2 from "@public/mainSliderHome/slider2.jpg";
import img3 from "@public/mainSliderHome/slider3.jpg";
import img4 from "@public/mainSliderHome/slider4.jpg";
import img5 from "@public/mainSliderHome/slider5.jpg";
import img6 from "@public/mainSliderHome/slider6.jpg";

import imgCategoria1 from "@public/categoriaSlider/collection-circle-1.jpg";
import imgCategoria2 from "@public/categoriaSlider/collection-circle-2.jpg";
import imgCategoria3 from "@public/categoriaSlider/collection-circle-3.jpg";
import imgCategoria4 from "@public/categoriaSlider/collection-circle-4.jpg";
import imgCategoria5 from "@public/categoriaSlider/collection-circle-5.jpg";
import imgCategoria6 from "@public/categoriaSlider/collection-circle-6.jpg";
import imgCategoria7 from "@public/categoriaSlider/collection-circle-7.jpg";


import imgDemo from "@public/swiper/05.jpg";

interface homeProps {

}

const home: React.FC<homeProps> = () => {

    const dataSliderBackground = [
        {
            img: img1.src,
            info: {
                title: "Descubre tu estilo",
                description: "Encuentra prendas únicas con un solo clic.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img2.src,
            info: {
                title: "Renueva tu guardarropa",
                description: "Ofertas exclusivas y envíos express te esperan.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img3.src,
            info: {
                title: "Transforma tu look hoy!",
                description: "Devoluciones fáciles y talleres para cada ocasión.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img4.src,
            info: {
                title: "Descubre tu estilo",
                description: "Encuentra prendas únicas con un solo clic.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img5.src,
            info: {
                title: "Renueva tu guardarropa",
                description: "Ofertas exclusivas y envíos express te esperan.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img6.src,
            info: {
                title: "Transforma tu look hoy!",
                description: "Devoluciones fáciles y talleres para cada ocasión.",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        }
    ];

    const dataCategoriasSlider = [
        { name: 'Mujeres', imgSrc: imgCategoria1.src },
        { name: 'Hombres', imgSrc: imgCategoria2.src },
        { name: 'Prendas', imgSrc: imgCategoria3.src },
        { name: 'Zapatos', imgSrc: imgCategoria4.src },
        { name: 'Bolso', imgSrc: imgCategoria5.src },
        { name: 'lentes', imgSrc: imgCategoria6.src },
        { name: 'recientes', imgSrc: imgCategoria7.src },

    ];

    const data = [
        { src: imgDemo, id: 'img1', alt: 'Descripción de la imagen 1', width: 600, height: 600, href: '/ruta1' },
        { src: imgDemo, id: 'de5mcoaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' },
        { src: imgDemo, id: 'dae5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgDemo, id: 'daexZ5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgDemo, id: 'de5mowaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' }
    ];

    const data2 = [
        { src: imgDemo, id: 'imsfg1', alt: 'Descripción de la imagen 1', width: 600, height: 600, href: '/ruta1' },
        { src: imgDemo, id: 'de5msdfcoaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' },
        { src: imgDemo, id: 'dasfde5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgDemo, id: 'dasfdexZ5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgDemo, id: 'de5mowsfdaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' }
    ];




    return (
        <Layout>
            <div className="slider-home">
                <SliderBackground data={dataSliderBackground} effect="morph-x" id="principalSlider" />
                <CategoriasSlider data={dataCategoriasSlider} />

                <DinamicZone />
                <div className="container-mentor">
                    <MentorBasico data={data} />
                    <MentorBasico data={data2} reverse={true} />
                </div>
            </div>
        </Layout>
    );
}

export default home;