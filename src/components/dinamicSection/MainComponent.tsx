import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Dinamic from "./components/Dinamic";


interface MainContentProps {
    context: string;
    setContext: React.Dispatch<React.SetStateAction<string>>;
}

const MainContent: React.FC<MainContentProps> = ({ context, setContext }) => {
    const renderComponent = () => {
        switch (context) {
            case "vendido":
                return <Dinamic endpoint="" />;
            case "nuevo":
                return <Dinamic endpoint="" />;
            case "oferta":
                return <Dinamic endpoint="" />;
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
