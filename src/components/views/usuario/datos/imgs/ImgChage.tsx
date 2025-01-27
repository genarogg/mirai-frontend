'use client'

import React, { useState } from 'react'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'
import Layout from '@components/layout/public/Layout'
import { useRouter } from 'next/navigation';

import { Img, InputImageUploader } from "@nano"
import BtnNormalBasic from '@components/btns/basic/btnNormalBasic'

import imgExample from "@public/example-up/img-example.webp"

import Collapsible from '@components/Collapsible/Collapsible'

import "../../sass/_imgPerfil.scss"

import handleImageUploadChange from "./fn/handleImageUploadChange"

interface ImgChageProps {
    footerData: any
    imgsExmaple: any
}

const ImgChage: React.FC<ImgChageProps> = ({ footerData, imgsExmaple }) => {
    const [state, setState] = useState({
        file: "",
        base64: "",
    });

    const router = useRouter();


    const ImgExample = ({ img, alt, id, width = 150, height = width }: any) => {
        return (
            <div className="ejemplo">
                <Img type='local'
                    src={img}
                    alt={alt} width={width}
                    height={height}
                    id={id}
                />
            </div>
        )
    }


    return (
        <Layout where='usuario change-for-img'>
            <HeaderGhost />

            <div className="container-up-img-analizer">
                <div className="internal-container">
                    <div className="container-img-analizer">
                        <h2>Foto de Perfil:</h2>
                        <InputImageUploader
                            htmlFor="cargar"
                            imgUrl={imgExample.src}
                            setState={setState} />
                    </div>
                    <div className="container-ejemplos">
                        <h2>Ejemplos:</h2>
                        <div className="ejemplos">
                            {
                                imgsExmaple.map((img: any, index: any) => (
                                    <ImgExample key={index}
                                        img={img.imgsrc}
                                        alt={img.alt}
                                        id={`${img.alt}a${index}`}
                                        width={img.width}
                                        height={img.height}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <BtnNormalBasic className="btnCargarImg" onClick={() => { handleImageUploadChange(state, router) }}>
                        Enviar Imagen
                    </BtnNormalBasic>
                    <div></div>
                    <div className="for-is">
                        <h2>Propósito del Uso de la Imagen</h2>
                        <p className='description'>
                            {footerData.decripcionProposito}
                        </p>

                        {footerData.propositoUsoImagen && (
                            <Collapsible
                                title=""
                                description=""
                            >
                                <ul>
                                    {footerData.propositoUsoImagen.map((consejo: any, index: any) => (
                                        <li key={index}>{consejo}</li>
                                    ))}
                                </ul>
                            </Collapsible>
                        )}

                    </div>
                    <div className="consejos">
                        <h2>Consejos</h2>
                        <p className='description'>
                            {footerData.descrpcionConsejo}
                        </p>
                        {footerData.consejos && (
                            <Collapsible
                                title="Importancia de la Calidad de la Imagen"
                                description=""
                            >
                                <ul>
                                    {footerData.consejos.map((consejo: any, index: any) => (
                                        <li key={index}>{consejo}</li>
                                    ))}
                                </ul>
                            </Collapsible>
                        )}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ImgChage;