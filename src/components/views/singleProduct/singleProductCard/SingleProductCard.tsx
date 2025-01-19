'use client'
import React from 'react'

import Slider from './Slider'

import "./sass/_singleProduct.scss"

interface SingleProductCardProps {

}

const SingleProductCard: React.FC<SingleProductCardProps> = () => {
    return (
        <>
          
            <div className='Container-single-product'>
                <Slider />
            </div>
        </>
    );
}

export default SingleProductCard;