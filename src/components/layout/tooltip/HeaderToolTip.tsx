import React from 'react'
import { UltimateTooTip, Icon } from 'nanify';
import { IoIosArrowDown } from "react-icons/io";


interface HeaderToolTipProps {
    title: string;
    children: React.ReactNode;
}

const HeaderToolTip: React.FC<HeaderToolTipProps> = ({ title, children }) => {

    const Title = () => {
        return (
            <h6>
                <label htmlFor="">
                    {title}
                </label>
                <Icon icon={<IoIosArrowDown />} />
            </h6>
        );
    }

    const Content = () => {
        return (<>{children}</>);
    }


    return (
        <UltimateTooTip
            title={<Title />}
            content={<Content />}
            arrow={false}
        />
    );
}

export default HeaderToolTip;