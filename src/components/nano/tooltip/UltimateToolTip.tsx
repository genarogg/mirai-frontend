import React from "react";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

interface UltimateTooTipProps {
    title: React.ReactNode;
    content: React.ReactNode;
    className?: string;
    placement?: "top" | "bottom" | "left" | "right";
    animation?: "shift-away" | "shift-away-extreme" | "fade";
    interactive?: boolean;
    arrow?: boolean;
    trigger?: "mouseenter" | "click" | "focus";
}

const UltimateTooTip: React.FC<UltimateTooTipProps> = ({
    title,
    content,
    className = "",
    placement = "bottom",
    animation = "shift-away",
    interactive = true,
    arrow = true,
    trigger = "mouseenter"
}) => {
    return (
        <div className={`container-menu-tooltip ${className}`}>
            <Tippy
                content={content}
                interactive={interactive}
                animation={animation}
                className="tooltip"
                arrow={arrow}
                placement={placement}
                trigger={trigger}
            >
                <span>{title}</span>
            </Tippy>
        </div>
    );
};

export default UltimateTooTip;