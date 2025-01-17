import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";
import Demo3 from "./components/Demo3";

interface MainContentProps {
    context: string;
    setContext: React.Dispatch<React.SetStateAction<string>>;
}

const MainContent: React.FC<MainContentProps> = ({ context, setContext }) => {
    const renderComponent = () => {
        switch (context) {
            case "vendido":
                return <Demo1 />;
            case "nuevo":
                return <Demo2 />;
            case "oferta":
                return <Demo3 />;
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
