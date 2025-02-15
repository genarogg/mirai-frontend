'use client'
import React from 'react'
import Layout from '@components/layout/public/Layout'

import "./sass/_singleProduct.scss"

import SingleProductCard from '@components/views/singleProduct/singleProductCard/SingleProductCard'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'

import DescriptionProduct from './descriptionProduct/DescriptionProduct'

import ProductComments from './resenaYcomentarios/ProductComments'

import ProductReviews from './resenaYcomentarios/ProductReviews'


interface SingleProductProps {
    product: any
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
    return (
        <Layout>
            <HeaderGhost />
            <div className="container-product-data">
                <div className="internar-container">
                    <SingleProductCard />
                    <DescriptionProduct product={product} />

                </div>
            </div>
            <div className="container-product-data productReviewsAndComments">
                <div className="internar-container">
                    {/* <div className="productReviewsAndComments grid grid-cols-1 md:grid-cols-2 gap-8"> */}
                        <ProductReviews reviews={product.reviews} averageRating={product.averageRating} />
                        <ProductComments comments={product.comments} />
                    {/* </div> */}
                </div>
            </div>
        </Layout>
    );
}

export default SingleProduct;