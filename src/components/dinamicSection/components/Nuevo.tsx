'use client'
import React, { useEffect, useState } from 'react';
import CardProductoAlana from '@components/card/singleProduct/CardProductoAlana';
import Squeleto from '@components/nano/nano/Squeleto';
import { regexUrl } from '@fn/regexUtils';
import "./sass/_dinamicCardContainer.scss";
import { URL_STRIPI_GQL, URL_STRIPI } from '@env';

interface NuevoProps {}

const Nuevo: React.FC<NuevoProps> = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(URL_STRIPI_GQL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                products(
                                    filters: {}
                                    sort: ["createdAt:desc"]
                                    pagination: { limit: 12 }
                                ) {
                                    titulo
                                    base_price
                                    tallas {
                                        talla
                                        color
                                        stock
                                    }
                                    img_main {
                                        url
                                        name
                                    }
                                    img_secundary {
                                        url
                                        name
                                    }
                                }
                            }
                        `,
                    }),
                });

                const result = await response.json();

                const formattedData = result.data.products.map((product: any) => ({
                    titulo: product.titulo,
                    url: "/producto/" + regexUrl(product.titulo),
                    imgs: [
                        URL_STRIPI + product.img_main.url,
                        URL_STRIPI + product.img_secundary.url
                    ],
                    precio: product.base_price,
                    colores: product.tallas.map((talla: any) => extraerCodigoColor(talla)),
                    tallas: product.tallas.map((talla: any) => talla.talla)
                }));

                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    function extraerCodigoColor(item: any) {
        if (!item.color.includes("_")) return null;
        const partes = item.color.split("_");
        return `#${partes[1]}`;
    }

    return (
        <div className="external-dinamic-card-container">
            <div className="dinamic-card-container">
                {loading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <Squeleto key={index} width={360} height={460} />
                    ))
                ) : (
                    <>
                        {data.slice(0, 4).map((item, index) => (
                            <CardProductoAlana key={index} data={item} id="t1" />
                        ))}
                        {data.slice(4, 8).map((item, index) => (
                            <CardProductoAlana key={index} data={item} id="t2" />
                        ))}
                        {data.slice(8, 12).map((item, index) => (
                            <CardProductoAlana key={index} data={item} id="t3" />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Nuevo;
