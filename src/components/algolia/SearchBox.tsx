import React, { useState, useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch";
import { FaSearch } from "react-icons/fa";
import { Icon } from "nanify";

import { isProd } from "@env"

interface SearchBoxProps {
    onQueryChange: (query: string) => void;
    typingSpeed?: number;
    pauseBetweenPhrases?: number;
    styleSearchBox?: any;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    onQueryChange,
    typingSpeed = 150,  // Valor por defecto
    pauseBetweenPhrases = 2000,  // Valor por defecto
    styleSearchBox = "",
}) => {
    const { refine } = useSearchBox();
    const placeholders = [
        "Busca tu estilo perfecto...",
        "¿Qué prenda estás buscando hoy?",
        "Descubre tus favoritos...",
        "Busca por categoría o tendencia...",
    ];

    const [placeholder, setPlaceholder] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        let charIndex = 0;
        let phraseIndex = 0;
        let typingTimeout: NodeJS.Timeout;
        let pauseTimeout: NodeJS.Timeout;

        if (!isProd) {
            setPlaceholder("desarrollo")
            return
        }

        // Función de tipo animación que utiliza setTimeout para escribir letra por letra
        const typePlaceholder = () => {
            if (!isTyping && inputRef.current) {
                const currentPhrase = placeholders[phraseIndex];
                if (charIndex < currentPhrase.length) {
                    setPlaceholder(currentPhrase.slice(0, charIndex + 1));
                    charIndex++;
                    typingTimeout = setTimeout(typePlaceholder, typingSpeed);  // Espera antes de escribir el siguiente carácter
                } else {
                    // Pausa antes de continuar con la siguiente frase
                    pauseTimeout = setTimeout(() => {
                        charIndex = 0;
                        setPlaceholder("");
                        phraseIndex = (phraseIndex + 1) % placeholders.length;
                        typePlaceholder();
                    }, pauseBetweenPhrases);
                }
            }
        };

        typePlaceholder();

        return () => {
            // Limpia los temporizadores al desmontar el componente
            clearTimeout(typingTimeout);
            clearTimeout(pauseTimeout);
        };
    }, [typingSpeed, pauseBetweenPhrases]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        refine(value);
        onQueryChange(value);
    };

    return (
        <div className={`algoliaBox notHover
        ${styleSearchBox}
        `}>
            <Icon icon={<FaSearch />} className="boxOne" />
            <input
                className={`boxTwo`}
                id="serach"
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBox;
