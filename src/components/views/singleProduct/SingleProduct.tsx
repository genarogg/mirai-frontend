'use client'
import React from 'react'
import Layout from '@components/layout/public/Layout'

import "./sass/_singleProduct.scss"

import SingleProductCard from '@components/views/singleProduct/singleProductCard/SingleProductCard'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'

import DescriptionProduct from './descriptionProduct/DescriptionProduct'


interface SingleProductProps {

}

const SingleProduct: React.FC<SingleProductProps> = () => {
    return (
        <Layout>
            <HeaderGhost />
            <div className="container-product-data">
                <div className="internar-container">
                    <SingleProductCard />
                    <DescriptionProduct />
                </div>

            </div>
        </Layout>
    );
}

export default SingleProduct;