import React from 'react'
import Layout from '@components/layout/public/Layout';
import SliderBackground from '@components/swiper/sliderBackground/SliderBackgroud';
import CategoriasSlider from '@components/sections/categoriasSlider/CategoriasSlider';

import img1 from "@public/swiper/01.jpg";
import img2 from "@public/swiper/02.jpg";
import img3 from "@public/swiper/03.jpg";
import img4 from "@public/swiper/04.jpg";
import img5 from "@public/swiper/05.jpg";

interface homeProps {

}

const home: React.FC<homeProps> = () => {

    const dataSliderBackground = [
        {
            img: img1.src,
            info: {
                title: "Simple Style",
                description: "From casual to formal, we've got you covered",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img2.src,
            info: {
                title: "Simple Style2",
                description: "From casual to formal, we've got you covered",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img3.src,
            info: {
                title: "Simple Style3",
                description: "From casual to formal, we've got you covered",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },

        {
            img: img4.src,
            info: {
                title: "Simple Style4",
                description: "From casual to formal, we've got you covered",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },
        {
            img: img5.src,
            info: {
                title: "Simple Style5",
                description: "From casual to formal, we've got you covered",
                btn: {
                    text: "Shop collection",
                    link: "#"
                }
            }
        },



    ];

    const dataCategoriasSlider = [
        { name: 'Categoría 1', imgSrc: 'https://w0.peakpx.com/wallpaper/390/219/HD-wallpaper-abstract-color-cuadros-fondo-life.jpg' },
        { name: 'Categoría 2', imgSrc: 'https://w0.peakpx.com/wallpaper/390/219/HD-wallpaper-abstract-color-cuadros-fondo-life.jpg' },
        { name: 'Categoría 3', imgSrc: 'https://w0.peakpx.com/wallpaper/390/219/HD-wallpaper-abstract-color-cuadros-fondo-life.jpg' },
        { name: 'Categoría 4', imgSrc: 'https://w0.peakpx.com/wallpaper/390/219/HD-wallpaper-abstract-color-cuadros-fondo-life.jpg' },
        { name: 'Categoría 5', imgSrc: 'https://w0.peakpx.com/wallpaper/390/219/HD-wallpaper-abstract-color-cuadros-fondo-life.jpg' },
    ];

    return (
        <Layout>
            <div className="slider-home">
                <SliderBackground data={dataSliderBackground} effect="ripple" />
                <CategoriasSlider data={dataCategoriasSlider} />
            </div>
        </Layout>
    );
}

export default home;