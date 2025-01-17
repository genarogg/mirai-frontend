'use client'
import React from 'react'
import CardProductoAlana from '@components/card/singleProduct/CardProductoAlana'
import { regexUrl } from '@fn/regexUtils'

import "./sass/_dinamicCardContainer.scss";

interface DinamicProps {
    endpoint: string
}

const Dinamic: React.FC<DinamicProps> = ({ endpoint }) => {
    const data = [
        {
            titulo: "Prodwucto 2",
            url: regexUrl("dewamo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 120,
            colores: ["#111", "#fff"],
            tallas: ["S", "M", "L"]
        },
        {
            titulo: "Prodwucto 2",
            url: regexUrl("dewamo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 120,
            colores: ["#111", "#fff"],
            tallas: ["S", "M", "L"]
        },
        {
            titulo: "Prodwucato 3",
            url: regexUrl("dwemo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 90,
            colores: ["#222", "#808"],
            tallas: ["M", "L", "XL"]
        },
        {
            titulo: "Prodwaucto 1",
            url: regexUrl("demo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 100,
            colores: ["#000", "#f0e"],
            tallas: ["S", "M", "L", "XL"]
        },
        {
            titulo: "Prwoducto 2",
            url: regexUrl("demo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 120,
            colores: ["#111", "#fff"],
            tallas: ["S", "M", "L"]
        },
        {
            titulo: "Produwcto 3",
            url: regexUrl("demwo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 90,
            colores: ["#222", "#808"],
            tallas: ["M", "L", "XL"]
        },

        {
            titulo: "Prwoducto 2",
            url: regexUrl("demo-url"),
            imgs: [
                "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
                "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
            ],
            precio: 120,
            colores: ["#111", "#fff"],
            tallas: ["S", "M", "L"]
        },
        // {
        //     titulo: "Produwcto 3",
        //     url: regexUrl("demwo-url"),
        //     imgs: [
        //         "https://esprit.vteximg.com.br/arquivos/ids/1370194/34_432F001_GRI180403_0.jpg",
        //         "https://esprit.vteximg.com.br/arquivos/ids/1370625/34_432F014_VER190516_0.jpg"
        //     ],
        //     precio: 90,
        //     colores: ["#222", "#808"],
        //     tallas: ["M", "L", "XL"]
        // },
    ];

    return (
        <div className="dinamic-card-container">
            {data.map((item, index) => (
                <CardProductoAlana key={index} data={item} />
            ))}
        </div>
    );
}

export default Dinamic;