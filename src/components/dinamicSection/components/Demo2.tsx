'use client'
import React from 'react'
import CardProductoAlana from '@components/card/singleProduct/CardProductoAlana'
import { regexUrl } from '@fn/regexUtils'

interface Demo2Props {

}

const Demo2: React.FC<Demo2Props> = () => {
    const data = {
        titulo: "Producto 2",
        url: regexUrl("afd adsf"),
        imgs: [
            "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
            "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
        ],
        precio: 100,
        colores: ["#000", "#f0e"],
        tallas: ["S", "M", "L", "XL"]
    }

    return (
        <>
            <CardProductoAlana data={data} />
            <CardProductoAlana data={data} />
            <CardProductoAlana data={data} />
        </>
    );
}

export default Demo2;