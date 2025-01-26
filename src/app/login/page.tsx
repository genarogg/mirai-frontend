import React from 'react'
import Layout from '@components/layout/public/Layout';
import Auth from '@components/views/auth/Auth';

interface authProps {

}

const auth: React.FC<authProps> = () => {
    return (
        <Layout where='usuario'>
            <Auth />
        </Layout>
    );
}

export default auth;