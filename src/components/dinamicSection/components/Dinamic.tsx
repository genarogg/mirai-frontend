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
    ];

    return (
        <div className="dinamic-card-container">
            <div className="dinamic-card-container">
                {data.slice(0, 4).map((item, index) => (
                    <CardProductoAlana key={index} data={item} id="t1" />
                ))}
                {data.slice(4, 8).map((item, index) => (
                    <CardProductoAlana key={index} data={item} id="t2" />
                ))}
                {data.slice(8, 12).map((item, index) => (
                    <CardProductoAlana key={index} data={item} id="t3" />
                ))}
            </div>
        </div>
    );
}

export default Dinamic;