import React from 'react';
import { Img, Icon, A } from 'nanify';
import { FaRegHeart } from "react-icons/fa";
import { regexUrl } from "@fn/index"
import HeaderToolTip from '@components/layout/tooltip/HeaderToolTip';

interface HeaderDownProps {
    data: any;
}

const HeaderDown: React.FC<HeaderDownProps> = ({ data }) => {


    const SubCategoria = ({ name, items, itemType }: any) => (
        <div className="subCategoria">
            <h5 className='slideIn'>{name}</h5>
            <nav>
                <ul>
                    <li className='slideIn'>
                        <A href={`/categoria/${regexUrl(name)}`} >
                            <div className="viewmore">
                                <Icon icon={<FaRegHeart />} />
                            </div>
                            <h6>Ver más!</h6>
                        </A>
                    </li>
                    {items.map((item: any, index: any) => (
                        <li className='slideIn' key={index}>
                            <A href={`/categoria/${regexUrl(item.label)}`}>
                                <Img
                                    type={itemType}
                                    src={item.imgSrc}
                                    width={80}
                                    height={80}
                                    alt={item.imgAlt}
                                    className='imgCategoria'
                                    visible={false}
                                />
                                <h6>{item.label}</h6>
                            </A>
                        </li>
                    ))}
                </ul>
            </nav>
        </div >
    );

    const ContainerLeft = ({ containerLeft }: any) => (
        <div className="containerLeft">
            <Img
                type={containerLeft.type}
                src={containerLeft.src}
                blurDataURL={containerLeft.blurDataURL}
                alt={containerLeft.alt}
                width={400}
                height={400}
                visible={false}

            />
        </div>
    );

    const NavToolTip = ({ title, containerLeft, subcategories }: any) => (
        <li>
            <HeaderToolTip title={title}>
                <div className="containerCategoria">
                    <ContainerLeft containerLeft={containerLeft} />
                    <div className="categorias">
                        {subcategories.map((sub: any, index: any) => (
                            <SubCategoria
                                key={index}
                                name={sub.name}
                                itemType={sub.itemType}
                                items={sub.items} />
                        ))}
                    </div>
                </div>
            </HeaderToolTip>
        </li>
    );

    return (
        <div className="headerDown">
            <nav className='navToolTip'>
                <ul>
                    {data.map((category: any, index: any) => (
                        <NavToolTip
                            key={index}
                            title={category.title}
                            containerLeft={category.containerLeft}
                            subcategories={category.subcategories}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default HeaderDown;
