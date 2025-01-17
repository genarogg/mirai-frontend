"use client";

import React from 'react'
import Image from 'next/image';

import ImgProps from './ImgProps';

const ImgBG: React.FC<ImgProps> = ({
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

    const loadend = () => {

        const img = document.getElementById(id + "Img");
        const conteiner = document.getElementById(id + "Conteiner");

        if (img && conteiner) {

            const srcImg = img.getAttribute("src");

            conteiner.style.backgroundImage = `url(${srcImg})`;
            conteiner.style.opacity = '1';

            setTimeout(() => {
                img.remove()
            }, 1500);

        }
    }

    return (
        <>
            <Image
                src={src}
                alt={alt}
                id={id + "Img"}
                placeholder={placeholder}
                blurDataURL={src.blurDataURL}
                width={width}
                height={height}
                loading={"eager"}
                priority={true}
                quality={quality}
                style={{ display: 'none' }}
                sizes={sizes}
                onLoad={() => { loadend() }}
            />
            <div
                className={`responsiveImage`}
                style={{
                    backgroundImage: `url(${src.blurDataURL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    width,
                    height,
                    position: 'relative',
                    overflow: 'hidden',

                }}>
                <div
                    id={id + "Conteiner"}
                    className={`${className} responsiveImage fadeIn`}
                    style={{
                        backgroundImage: `url(${src.blurDataURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        width,
                        height,
                        position: 'absolute',
                        ...style
                    }}>
                    {children}
                </div>
            </div>


        </>
    );
}

export default ImgBG;