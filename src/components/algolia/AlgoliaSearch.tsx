"use client";

import React, { useReducer, useState, useRef } from "react";
import { algoliasearch } from "algoliasearch";
import { Hits, Configure } from "react-instantsearch";
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import RecentSearches from "./RecentSearches";
import { AnimatePresence, motion } from "framer-motion";
import "./sass/_algolia.scss";

import { ALGOLIA_ID, ALGOLIA_KEY } from "@env";

import SearchBox from "./SearchBox";
import Hit from "./Hit";

// Importar el reducer y el estado inicial
import { searchReducer, initialState } from "./searchReducer";

if (!ALGOLIA_ID || !ALGOLIA_KEY) {
    throw new Error("Algolia credentials not provided");
}

// Configuración del cliente completo
const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);

interface SearchItem {
    className?: string;
    styleSearchBox?: string;
}

const AlgoliaSearch: React.FC<SearchItem> = ({
    className = "",
    styleSearchBox }) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    const handleQueryChange = (newQuery: string) => {
        dispatch({ type: "SET_QUERY", payload: newQuery });
    };

    const searchRecent = () => {
        const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        dispatch({ type: "SET_RECENT_SEARCHES", payload: storedSearches });
    };

    const addRecentSearch = (title: string, url: string) => {
        const newSearch = { title, url };

        // Obtener búsquedas actuales desde localStorage
        const storedSearches: { title: string; url: string }[] =
            JSON.parse(localStorage.getItem("recentSearches") || "[]");

        // Filtrar duplicados
        const filteredSearches = storedSearches.filter(search => search.title !== title);

        // Agregar el nuevo elemento y limitar a 5 
        const updatedSearches = [newSearch, ...filteredSearches].slice(0, 5);

        // Actualizar estado y localStorage
        dispatch({ type: "SET_RECENT_SEARCHES", payload: updatedSearches });
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsSearchFocused(true);
    };

    const handleBlur = () => {
        setIsSearchFocused(false);
    };

    return (
        <div
            className={`algoliaSearch ${className}`} onClick={searchRecent}
            ref={searchRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <InstantSearchNext indexName="movie" searchClient={searchClient}>
                <SearchBox
                    onQueryChange={handleQueryChange}
                    styleSearchBox={styleSearchBox}
                />
                <Configure hitsPerPage={5} />
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                        height: state.query && isSearchFocused ? 'auto' : '0px'
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                >
                    <AnimatePresence>
                        {state.query && state.hasResults && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="animatedResults"
                            >
                                <Hits
                                    hitComponent={(hitProps) => (
                                        <Hit {...hitProps} addRecentSearch={addRecentSearch} />
                                    )}
                                />
                            </motion.div>
                        )}
                        {state.recentSearches.length > 0 && (
                            <RecentSearches recentSearches={state.recentSearches} />
                        )}
                    </AnimatePresence>
                </motion.div>
            </InstantSearchNext>
        </div>
    );
};

export default AlgoliaSearch;
