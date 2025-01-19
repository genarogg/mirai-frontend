'use client'
import React from 'react'
import "./sass/_headerGhost.scss"

interface HeaderGhostProps {

}

const HeaderGhost: React.FC<HeaderGhostProps> = () => {
    return (
        <>
            <div className="header-ghost"></div>
        </>
    );
}

export default HeaderGhost;