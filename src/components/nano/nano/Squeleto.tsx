import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SqueletoProps {
    width: any;
    height: any;
    baseColor?: string;
    highlightColor?: string;
    duration?: number;
    style?: any;
}

const Squeleto: React.FC<SqueletoProps> = ({
    width,
    height,
    baseColor = "#f0f0f0",
    highlightColor = "#e0e0e0",
    duration = 1.5,
    style
}) => {
    return (
        <Skeleton
            width={width}
            height={height}
            baseColor={baseColor}
            highlightColor={highlightColor}
            duration={duration}
            style={style}
        />
    );
}

export default Squeleto;