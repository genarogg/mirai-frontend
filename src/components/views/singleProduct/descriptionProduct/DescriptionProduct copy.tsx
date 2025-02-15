'use client'
import React, { useRef } from 'react'
import BtnNormalBasic from '@components/btns/basic/btnNormalBasic'

import "./sass/_descriptionProduct.scss"

import { Icon } from '@components/nano';

import { TiStarFullOutline } from "react-icons/ti";

interface DescriptionProductProps { }

const DescriptionProduct: React.FC<DescriptionProductProps> = () => {

    const inputRef = useRef({
        cantidad: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        inputRef.current = { ...inputRef.current, [name]: value };
    };

    return (
        <>
            <div className="description-product">
                <div className="container-titulo">
                    <h1>titulo</h1>
                </div>
                <div className="container-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ut eligendi voluptatum reiciendis nostrum at, ea obcaecati delectus unde tempora minima alias neque saepe laboriosam tenetur recusandae quam! Unde, eveniet!

                    </p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ut eligendi voluptatum reiciendis nostrum at, ea obcaecati delectus unde tempora minima alias neque saepe laboriosam tenetur recusandae quam! Unde, eveniet!

                    </p>

                </div>
                <hr />
                <div className="container-ranking">
                    <div className="ranking">
                        <h2>
                            <span className='titulo'>ranking:</span>

                        </h2>
                        <span className="ranking-stars">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Icon icon={<TiStarFullOutline />} key={index} />
                            ))}
                        </span>

                    </div>
                    <div className="ranking vendedor">
                        <h2>
                            <span className='titulo'>vendedor:</span>

                        </h2>
                        <span className="ranking-stars">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Icon icon={<TiStarFullOutline />} key={index} />
                            ))}
                        </span>

                    </div>
                </div>
                <hr />
                <div className="tallas-y-colores-container">
                    <div className="colores">
                        <h2>colores:</h2>
                        <div className="color" style={{ backgroundColor: 'red' }}></div>

                    </div>
                    <div className="tallas">
                        <h2>tallas:</h2>
                        <div className="talla">
                            <span>xl</span>
                        </div>
                        <div className="talla">
                            <span>l</span>
                        </div>

                    </div>
                </div>
                <hr />
                <div className="precio-y-cantidad-container">
                    {/* <div className="container-cantidad">
                        <h2>cantidad</h2>
                        <Input
                            type="number"
                            name="cantidad"
                            placeholder='cantidad'
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="container-precio">
                        <h2>precio</h2>
                        <p>$1000</p>
                    </div>
                </div>
                <hr />
                <div className="anadir-carrito">
                    <div className="btn-container">
                        <BtnNormalBasic >
                            <span>
                                Agregar al carrito
                            </span>
                        </BtnNormalBasic>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DescriptionProduct;