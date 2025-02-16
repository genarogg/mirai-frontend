'use client'
import React,{useState} from 'react'
import SliderBackground from '@components/swiper/sliderBackground/SliderBackgroud';

import img1 from "@public/mainSliderHome/slider1.jpg";
import img2 from "@public/mainSliderHome/slider2.jpg";
import img3 from "@public/mainSliderHome/slider3.jpg";
import img4 from "@public/mainSliderHome/slider4.jpg";
import img5 from "@public/mainSliderHome/slider5.jpg";
import img6 from "@public/mainSliderHome/slider6.jpg";

interface sliderHomeProps {

}

const sliderHome: React.FC<sliderHomeProps> = () => {

    const [dataSliderBackground, setDataSliderBackground] = useState(
        [
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
        ]
    )


    return (<>  <SliderBackground data={dataSliderBackground} effect="morph-x" id="principalSlider" /></>);
}

export default sliderHome;