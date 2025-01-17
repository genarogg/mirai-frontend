import React from 'react';
import './sass/_footer.scss';
import { LogoGenarogg, A, Icon } from "@nano";
import { FaHourglassEnd } from "react-icons/fa6";

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    const currentYear = new Date().getFullYear();

    const footerData = {
        logo: 'alana',
        address: '1234 Fashion Street, Suite 567, New York, NY 10001',
        email: 'info@fashionshop.com',
        phone: '(212) 555-1234',
        helpLinks: [
            { href: '/', text: 'Order Status' },
            { href: '/', text: 'Returns + Exchanges' },
            { href: '/', text: 'Shipping' },
            { href: '/', text: 'Terms + Conditions' },
            { href: '/', text: 'FAQ’s' },
            { href: '/', text: 'Compare' },
            { href: '/', text: 'My Wishlist' },
        ],
        aboutLinks: [
            { href: '/', text: 'About Us' },
            { href: '/', text: 'Our Story' },
            { href: '/', text: 'Careers' },
            { href: '/', text: 'Press' },
        ],
        socialLinks: [
            { href: 'A', icon: <FaHourglassEnd /> },
            { href: '#', icon: <FaHourglassEnd /> },
            { href: '#', icon: <FaHourglassEnd /> },
            { href: '#', icon: <FaHourglassEnd /> },
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
                                    lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaHourglassEnd />} />
                                    <span>Address:</span>
                                    <strong>{footerData.address}</strong>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaHourglassEnd />} />
                                    <span>Email:</span>
                                    <strong>{footerData.email}</strong>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <Icon icon={<FaHourglassEnd />} />
                                    <span>Phone:</span>
                                    <strong>{footerData.phone}</strong>
                                </label>
                            </li>
                        </ul>
                    </li>
                    <li className='col-2'>
                        <h6>Help</h6>
                        <ul>
                            {footerData.helpLinks.map((link, index) => (
                                <li key={index}>
                                    <A href={link.href}>
                                        <Icon icon={<FaHourglassEnd />} />
                                        <span>{link.text}</span>
                                    </A>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='col-3'>
                        <h6>About us</h6>
                        <ul>
                            {footerData.aboutLinks.map((link, index) => (
                                <li key={index}>
                                    <A href={link.href}>
                                        <Icon icon={<FaHourglassEnd />} />
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