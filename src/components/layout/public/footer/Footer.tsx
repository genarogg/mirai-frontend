import React from 'react';
import './sass/_footer.scss';
import { LogoGenarogg, A, Icon } from "@nano";
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    const currentYear = new Date().getFullYear();

    const footerData = {
        logo: 'Mirai',
        address: '789 Avenida de la Moda, Suite 300, Los Ángeles, CA 90015',
        email: 'soporte@Mirai.com',
        phone: '(310) 555-7890',
        helpLinks: [
            { href: '/estado-pedido', text: 'Estado del Pedido' },
            { href: '/devoluciones', text: 'Devoluciones y Cambios' },
            { href: '/envios', text: 'Información de Envíos' },
            { href: '/terminos', text: 'Términos y Condiciones' },
            { href: '/faq', text: 'Preguntas Frecuentes' },
            { href: '/comparar', text: 'Comparar Productos' },
            { href: '/wishlist', text: 'Mi Lista de Deseos' },
        ],
        aboutLinks: [
            { href: '/nosotros', text: 'Sobre Nosotros' },
            { href: '/historia', text: 'Nuestra Historia' },
            { href: '/empleos', text: 'Empleos' },
            { href: '/prensa', text: 'Prensa' },
        ],
        socialLinks: [
            { href: 'https://facebook.com/Mirai', icon: <FaFacebook /> },
            { href: 'https://instagram.com/Mirai', icon: <FaInstagram /> },
            { href: 'https://twitter.com/Mirai', icon: <FaTwitter /> },
        ],
    };

    return (
        <footer className='footer'>
            <div className="footerDesktop">
                <ul className='containerUl'>
                    <li className='col-1'>
                        <h6 className="logo">
                            <A href='/'>{footerData.logo}</A>
                        </h6>
                        <ul>
                            <li>
                                <label>
                                    Descubre las últimas tendencias de moda y compra estilos exclusivos en Mirai.
                                    Tu destino ideal para ropa y accesorios con estilo.
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaMapMarkerAlt />} />
                                    <span>Dirección:</span>
                                    <strong>{footerData.address}</strong>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaEnvelope />} />
                                    <span>Email:</span>
                                    <strong>{footerData.email}</strong>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaPhone />} />
                                    <span>Teléfono:</span>
                                    <strong>{footerData.phone}</strong>
                                </label>
                            </li>
                        </ul>
                    </li>
                    <li className='col-2'>
                        <h6>Ayuda</h6>
                        <ul>
                            {footerData.helpLinks.map((link, index) => (
                                <li key={index}>
                                    <A href={link.href}>
                                        <span>{link.text}</span>
                                    </A>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='col-3'>
                        <h6>Sobre nosotros</h6>
                        <ul>
                            {footerData.aboutLinks.map((link, index) => (
                                <li key={index}>
                                    <A href={link.href}>
                                        <span>{link.text}</span>
                                    </A>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="footerDown">
                <div className="left">
                    <p>© {currentYear} {footerData.logo}. Todos los derechos reservados.</p>
                </div>
                <div className="right">
                    <div className="redes">
                        <ul>
                            {footerData.socialLinks.map((link, index) => (
                                <li key={index}>
                                    <A type="a" href={link.href}>
                                        <Icon icon={link.icon} />
                                    </A>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
