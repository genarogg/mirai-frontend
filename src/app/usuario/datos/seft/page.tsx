'use client'
import React from 'react'
import HeaderGhost from '@components/layout/public/header/HeaderGhost'
import Layout from '@components/layout/public/Layout'

interface seftProps {

}

const seft: React.FC<seftProps> = () => {
    return (
        <>
            <Layout where='usuario'>
                <HeaderGhost />
            </Layout>
        </>
    );
}

export default seft;