import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuToolTipProps {
    children: React.ReactNode;
    title: string;
    description: string;
}


const Collapsible: React.FC<MenuToolTipProps> = ({ title, description, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="collapsible">
            <div
                className="summary"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}
            >
                {isOpen ? "Mostrar menos" : "Mostrar más"}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <h3>{title}</h3>
                        <p>{description}</p>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Collapsible;