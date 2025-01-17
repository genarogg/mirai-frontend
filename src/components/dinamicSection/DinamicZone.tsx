'use client'
import React, { useState } from 'react'
import MainContent from './MainComponent';

interface DinamicZoneProps {

}

const DinamicZone: React.FC<DinamicZoneProps> = () => {
    const [context, setContext] = useState("vendido");

    return (
        <div className="container-dinamic-zona">
            <nav>
                <button onClick={() => setContext("vendido")}>
                    Más vendido
                </button>
                <button onClick={() => setContext("nuevo")}>
                    Nuevo
                </button>
                <button onClick={() => setContext("oferta")}>
                    En oferta
                </button>
            </nav>

            <MainContent
                context={context}
                setContext={setContext}
            />

        </div>

    );
}

export default DinamicZone;