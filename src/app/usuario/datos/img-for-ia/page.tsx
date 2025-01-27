'use client'
import React from 'react'
import ImgChage from '@components/views/usuario/datos/imgs/ImgChage'
import imgExample from "@public/swiper/people-1.jpg"

interface imgChangeProps {

}

const imgChange: React.FC<imgChangeProps> = () => {
    const propositoUsoImagen = [

        "Color de Piel: Se analizarán los tonos y subtonos de la piel para clasificarlos en sistemas como Pantone Skintone, Fitzpatrick, Munsell, entre otros."
        ,

        "Color de Cabello: Se identificará el color natural del cabello (cuando sea visible) para complementar la paleta de color personal."
        ,

        "Color de Ojos: Se extraerán detalles del color del iris para integrarlos en el análisis."
        ,

        "Características Faciales Generales: Se evaluarán proporciones y formas básicas del rostro (por ejemplo, tipo de rostro) como contexto adicional para sugerencias de color."

        ,

        `Finalidad del Análisis: Crear una paleta de color personalizada que sea compatible con la colorimetría natural de la persona.",
                "Proporcionar recomendaciones personalizadas en términos de moda, maquillaje o estilo, basadas en sistemas internacionales como:
                
                 "Color Me Beautiful (primavera, verano, otoño, invierno).",
                "Sistemas especializados como el de L'Oréal o NARS."
                `,
    ];

    const consejos = [
        "La fotografía debe ser tomada de frente, con el rostro claramente visible y centrado en la imagen. Evita inclinaciones extremas o ángulos laterales.",
        "Asegúrate de que la iluminación sea uniforme y natural, evitando sombras pronunciadas o brillos excesivos en el rostro. Evita luces artificiales de colores que puedan alterar los tonos de piel.",
        "Usa una cámara de buena resolución para capturar detalles nítidos. La imagen debe estar bien enfocada y sin desenfoques.",
        "El fondo debe ser neutro, preferiblemente blanco o de un color claro, para que no interfiera con el análisis del rostro.",
        "Evita el uso de filtros de aplicaciones o cámaras que modifiquen el tono de la piel, textura o cualquier otra característica.",
        "Si es posible, la persona debe estar sin maquillaje o con el mínimo posible para que los tonos naturales de la piel sean visibles.",
        "El rostro debe estar limpio y sin elementos que obstruyan la piel, como gafas, sombreros o cabello cubriendo partes del rostro.",
        "El rostro debe ocupar la mayor parte de la imagen para que los detalles sean más fáciles de analizar.",
        "La fotografía debe mostrar únicamente un rostro, sin otras personas o elementos que puedan distraer el análisis.",
        "No edites la fotografía ni ajustes los colores o contraste después de capturarla."
    ];

    const descrpcionConsejo = "Para garantizar que el análisis sea lo más preciso posible, se necesita una imagen que cumpla con los requisitos mencionados (iluminación adecuada, sin filtros, etc.), ya que cualquier interferencia puede alterar los resultados y afectar la calidad de las recomendaciones generadas."

    const decripcionProposito = "La imagen será utilizada para llevar a cabo un reconocimiento facial basado en inteligencia artificial, con el objetivo de determinar la colorimetría personalizada del rostro. El análisis estará enfocado exclusivamente en las características físicas visibles del rostro, considerando principalmente:"

    const data = {
        consejos,
        propositoUsoImagen,
        descrpcionConsejo, decripcionProposito
    }

    const imgsExmaple = [
        { imgsrc: imgExample, alt: "img", width: 500, height: 700 },

    ]

    return (
        <ImgChage footerData={data} imgsExmaple={imgsExmaple}></ImgChage>);
}

export default imgChange;