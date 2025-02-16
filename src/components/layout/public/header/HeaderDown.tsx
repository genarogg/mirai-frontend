import React, { useState, useEffect } from 'react';
import { Img, Icon, A } from "@nano";
import { FaRegHeart } from "react-icons/fa";
import { regexUrl } from "@fn/index";
import HeaderToolTip from '@components/layout/tooltip/HeaderToolTip';
import { URL_STRIPI, URL_STRIPI_GQL } from "@env";

interface HeaderDownProps {}

const HeaderDown: React.FC<HeaderDownProps> = () => {
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

    return (
        <div className="headerDown">
            <nav className='navToolTip'>
                <ul>
                    {categorias.map((categoria: any) => (
                        <li key={categoria.nombre}>
                            <A href={`/categoria/${regexUrl(categoria.nombre)}`}>
                                {categoria.nombre.toUpperCase()}
                            </A>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default HeaderDown;