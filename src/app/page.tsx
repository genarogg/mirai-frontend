import React from 'react'
import Layout from '@components/layout/public/Layout';

interface homeProps {

}

const home: React.FC<homeProps> = () => {
    return (<Layout><p>Hola</p></Layout>);
}

export default home;