'use client'
import React, { useState } from 'react'
import MainContent from './MainComponent';

import "./sass/_dinamicZone.scss";

interface DinamicZoneProps {

}

const DinamicZone: React.FC<DinamicZoneProps> = () => {
    const [context, setContext] = useState("vendido");

    return (
        <div className="container-dinamic-zona">
            <nav className='nav-dinamic-zone'>
                <ul>
                    <li>
                        <button onClick={() => setContext("vendido")}>
                            Más vendido
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setContext("nuevo")}>
                            Nuevo
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setContext("oferta")}>
                            En oferta
                        </button>
                    </li>
                </ul>
            </nav>

            {/* <MainContent
                context={context}
                setContext={setContext}
            /> */}

        </div>

    );
}

export default DinamicZone;