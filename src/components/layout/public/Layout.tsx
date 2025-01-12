import React from 'react'
import Header from "./header/Header"
import Footer from './footer/Footer'
import "./sass/_layout.scss"

interface LayoutProps {
    children: React.ReactNode;
    where?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    where = "",
    header,
    footer
}) => {
    return (
        <div className={`${where} containerAll`}>
            {header ? header : <Header />}
            <main>
                {children}
            </main>
            {footer ? footer : <Footer />}
        </div>
    );
}

export default Layout;