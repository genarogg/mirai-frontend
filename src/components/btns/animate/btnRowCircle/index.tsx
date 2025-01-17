import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Icon } from "@nano";

import "./_btnRowCircle.scss";

interface BtnRowCircleProps {
    icon?: React.ReactNode;
    id?: string;
    onClick: () => void;
}

const BtnRowCircle: React.FC<BtnRowCircleProps> = ({ icon, id = "", onClick }) => {
    return (
        <div className='container-row-circle' id={id}>
            <button onClick={() => { onClick && onClick() }}>
                <Icon icon={icon ? icon : <FaArrowLeft />} />
            </button>
        </div>
    );
}

export default BtnRowCircle;