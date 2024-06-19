import React from 'react';
import useScroll from '../../hooks/useScroll';
import styles from './searchBar.module.css';

type SearchBarProps = {
    searchQuery: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearchChange }) => {
    const scrolledDown = useScroll(240);
    return (
        <div className={`${styles.search_container} ${scrolledDown ? styles.fixed : ''}`}>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.search_input}
                aria-label="Search input"
            />
        </div>
    );
};

export default SearchBar;
