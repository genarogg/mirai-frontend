'use client'
import React from 'react'
import CardProductoAlana from '@components/card/singleProduct/CardProductoAlana'
import { regexUrl } from '@fn/regexUtils'

interface Demo1Props {

}

const Demo1: React.FC<Demo1Props> = () => {
    const data = {
        titulo: "Producto 1",
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

export default Demo1;