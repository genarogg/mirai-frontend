import React from 'react'
import { A, Icon } from "@nano";
import { IoFlash } from "react-icons/io5";

interface HitProps {
    hit: any;
    addRecentSearch: (title: string, url: string) => void;
}

const Hit: React.FC<HitProps> = ({ hit, addRecentSearch }) => {
    const handleClick = () => {
        addRecentSearch(hit.title, hit.url);
    };

    return (
        <div className={`algoliaBox`}>
            <Icon icon={<IoFlash />} className="boxOne" />
            <A
                className="boxTwo"
                type='btn'
                href={`/${hit.title}`}
                onClick={handleClick}
            >
                <h3>{hit.title}</h3>
            </A>
        </div>
    );
};

export default Hit;
