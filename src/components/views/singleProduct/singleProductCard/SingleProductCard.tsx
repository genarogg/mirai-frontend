'use client'
import React from 'react'

import Slider from './Slider'

import "./sass/_singleProduct.scss"

interface SingleProductCardProps {
    product: any
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
    return (
        <>

            <div className='Container-single-product'>
                <Slider producto={product}/>
            </div>
        </>
    );
}

export default SingleProductCard;