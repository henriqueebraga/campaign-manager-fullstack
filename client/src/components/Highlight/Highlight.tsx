import React from 'react';
import styles from './highlight.module.css';

type HighlightProps = {
    text: string;
    searchQuery: string;
};

const Highlight: React.FC<HighlightProps> = ({ text, searchQuery }) => {
    if (!searchQuery) {
        return <span>{text}</span>;
    }

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span key={index} className={styles.highlighted_text}>
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
};

export default Highlight;
