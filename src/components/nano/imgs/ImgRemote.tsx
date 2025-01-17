'use client';

import React, { useState, useInsertionEffect, useEffect } from 'react';
import { Squeleto } from "../index"
import Image from 'next/image';
import { $ } from "../../../functions"
import ImgProps from './ImgProps';

import svg from "./svg"

const Img: React.FC<ImgProps> = ({
    src,
    alt,
    id,
    blurDataURL,
    placeholder,
    width,
    height,
    className,
    priority,
    loading,
    quality,
    sizes,
    style,
    children
}) => {


    const [svgBackground, setSvgBackground] = useState<string | null | any>(blurDataURL ? svg({ base64: blurDataURL }) : null);
    const [isLoad, setIsLoad] = useState<boolean>(blurDataURL ? false : true);


    useInsertionEffect(() => {
        if (typeof src === 'string' && src.startsWith('http') && !blurDataURL) {
            fetch(`/api/getBase64/remote?url=${encodeURIComponent(src)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.data) {
                        setSvgBackground(svg({ base64: data.data }));
                        setIsLoad(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching SVG:', error);
                });
        }
    }, [src]);

    useEffect(() => {
        const conteiner = $(id + "Conteiner");
        const img = $(id + "Img");
        const ghost = $(id + "ghost");


        if (img && conteiner && ghost) {

            conteiner.style.width = img.offsetWidth + "px";
            conteiner.style.height = img.offsetHeight + "px";
            ghost.style.width = img.offsetWidth + "px";
            ghost.style.height = img.offsetHeight + "px";

            img.style.opacity = "1";

            setTimeout(() => {
                conteiner.style.backgroundImage = "initial";
            }, 1500);

        }
    }, [isLoad]);

    return (
        <div
            style={{
                width,
                height,
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            className={`responsiveImage`}

        >
            {isLoad ? (
                <Squeleto
                    width={width}
                    height={height}
                />
            ) : (
                <>
                    <div
                        style={{
                            backgroundImage: `url(${svgBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width,
                            height,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        className={`responsiveImage`}
                        id={id + "Conteiner"}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            id={id + "Img"}
                            className={`${className} responsiveImage fadeIn`}
                            placeholder={placeholder}
                            blurDataURL={svgBackground}
                            width={width}
                            height={height}
                            loading={loading}
                            priority={priority}
                            quality={quality}
                            style={{ position: 'absolute' }}
                            sizes={sizes}
                        />
                        <div
                            className={`responsiveImage`}
                            style={{ width, height }}
                            id={id + "ghost"} >
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Img;