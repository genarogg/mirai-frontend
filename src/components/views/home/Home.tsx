import React, { useState, useEffect } from 'react'
import Layout from '@components/layout/public/Layout';
import SliderBackground from '@components/swiper/sliderBackground/SliderBackgroud';
import CategoriasSlider from '@components/sections/categoriasSlider/CategoriasSlider';

import MentorBasico from '@components/mentorHome/MentorBasico';

import DinamicZone from '@components/dinamicSection/DinamicZone';

import { URL_STRIPI, URL_STRIPI_GQL } from "@env"



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

import imgMentor1 from "@public/homeMentor/mentor1.jpg";
import imgMentor2 from "@public/homeMentor/mentor2.jpg";
import imgMentor3 from "@public/homeMentor/mentor3.jpg";

import imgMentor4 from "@public/homeMentor/mentor12.jpg";
import imgMentor5 from "@public/homeMentor/mentor13.jpg";
import imgMentor6 from "@public/homeMentor/mentor14.jpg";

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

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch(URL_STRIPI_GQL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                categorias {
                                nombre
                                    img {
                                        url
                                    }
                                }
                            }
                        `,
                    }),
                });

                const result = await response.json();
                setCategorias(result.data.categorias);
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    const dataCategoriasSlider = categorias.map((categoria: any) => ({
        name: categoria.nombre,
        imgSrc: URL_STRIPI + categoria.img.url,
    }));


    const data = [
        { src: imgMentor2, id: 'img1', alt: 'Descripción de la imagen 1', width: 600, height: 600, href: '/ruta1' },
        { src: imgCategoria6, id: 'de5mcoaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' },
        { src: imgMentor3, id: 'dae5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgMentor6, id: 'daexZ5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgMentor5, id: 'de5mowaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' }
    ];

    const data2 = [
        { src: imgMentor4, id: 'imsfg1', alt: 'Descripción de la imagen 1', width: 600, height: 600, href: '/ruta1' },
        { src: imgMentor2, id: 'de5msdfcoaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' },
        { src: imgMentor1, id: 'dasfde5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgMentor3, id: 'dasfdexZ5moaf', alt: 'imagen de fondo', width: 160, height: 190, href: '/' },
        { src: imgMentor4, id: 'de5mowsfdaf', alt: 'imagen de fondo', width: 600, height: 600, href: '/' }
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