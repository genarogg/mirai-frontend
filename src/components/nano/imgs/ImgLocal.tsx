'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { $ } from "../../../functions";

import ImgProps from './ImgProps';

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
    children,
    visible
}) => {
    const [isVisible, setIsVisible] = useState(visible);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    useEffect(() => {

        if (isVisible) {
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
        }
    }, [isVisible, id]);

    return (
        <div
            ref={imgRef}
            style={{
                width,
                height,
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            className={`responsiveImage`}
        >
            {isVisible && (
                <>
                    <div
                        style={{
                            backgroundImage: `url(${src.blurDataURL})`,
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
                            blurDataURL={src.blurDataURL}
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
                            id={id + "ghost"}
                        >
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Img;