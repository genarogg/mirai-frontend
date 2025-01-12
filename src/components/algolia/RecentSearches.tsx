import React from 'react';
import { Icon, A } from 'nanify';
import { TbReload } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import style from './sass/_algolia.module.scss';

interface SearchItem {
    title: string;
    url: string;
}

interface RecentSearchesProps {
    recentSearches: SearchItem[];
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches }) => {
    if (!recentSearches.length) return null;

    return (
        <div className="recentSearches">
            <div className={`title algoliaBox`}>
                <Icon icon={<IoTimerOutline />} className="boxOne" />
                <h3 className="boxTwo">Búsquedas Recientes</h3>
            </div>
            <ul>
                {recentSearches.map((search, index) => (
                    <li key={index} className="algoliaBox">

                        <Icon icon={<TbReload />} className="boxOne"/>
                        <A
                            className="boxTwo"
                            type='btn'
                            href={`/${search.url}`}
                        >
                            <h3>{search.title}</h3>
                        </A>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSearches;
