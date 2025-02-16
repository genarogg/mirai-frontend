import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Vendido from "./components/Vendido";
import Nuevo from "./components/Nuevo";
import Oferta from "./components/Oferta";

interface MainContentProps {
    context: string;
    setContext: React.Dispatch<React.SetStateAction<string>>;
}

const MainContent: React.FC<MainContentProps> = ({ context, setContext }) => {
    const renderComponent = () => {
        switch (context) {
            case "vendido":
                return <Vendido />;
            case "nuevo":
                return <Nuevo />;
            case "oferta":
                return <Oferta />;
            default:
                return <p>Error al cargar zona dinamica</p>;
        }
    };

    return (
        <SwitchTransition>
            <CSSTransition key={context} timeout={500} classNames="fade">
                {renderComponent()}
            </CSSTransition>
        </SwitchTransition>
    );
};

export default MainContent;
