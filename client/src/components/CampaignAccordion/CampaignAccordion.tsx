import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useDebounce from '../../hooks/useDebounce';
import CampaignTreeList from '../CampaignTreeList/CampaignTreeList';
import SearchBar from '../SearchBar/SearchBar';
import { Campaign, SetNodeElement, CampaignItem } from '../../types/types';

import styles from './campaignAccordion.module.css';

type CampaignAccordionProps = {
    data: Campaign;
}

const CampaignAccordion: React.FC<CampaignAccordionProps> = ({ data }) => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<SetNodeElement>(data.set);
    const [isSearchMatched, setIsSearchMatched] = useState<boolean>(true);
    const accordionRef = useRef<HTMLDivElement>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const toggleAccordion = useCallback((id: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }, []);

    const filterElements = useCallback((elements: (CampaignItem | SetNodeElement)[] | undefined, term: string): (CampaignItem | SetNodeElement)[] => {

        const lowerTerm = term.toLowerCase();
    
        if (!elements) {
            return [];
        }
    
        const filtered = elements.filter(element => {
            if ('groupId' in element) {
                const filteredChildren = filterElements(element.elements, term);
                return element.name.toLowerCase().includes(lowerTerm) || filteredChildren.length > 0;
            } else {
                return element.name.toLowerCase().includes(lowerTerm);
            }
        });

        setIsSearchMatched(filtered.length > 0);
        return filtered;
    }, []);

    const openParents = useCallback((elements: (CampaignItem | SetNodeElement)[] | undefined, term: string) => {
        if (!elements) {
            return;
        }
    
        const lowerTerm = term.toLowerCase();
        const openIds: { [key: string]: boolean } = {};
    
        const searchAndOpen = (elements: (CampaignItem | SetNodeElement)[]) => {
            elements.forEach((element) => {
                if ('groupId' in element) {
                    const setElement = element as SetNodeElement;
                    const children = searchAndOpen(setElement.elements || []);
                    if (setElement.groupId !== undefined && (setElement.name.toLowerCase().includes(lowerTerm) || children)) {
                        openIds[setElement.groupId] = true;
                    }
                } else {
                    const campaignElement = element as CampaignItem;
                    if (campaignElement.campaignId && campaignElement.name.toLowerCase().includes(lowerTerm)) {
                        openIds[campaignElement.campaignId] = true;
                    }
                }
            });
            return Object.keys(openIds).length > 0;
        };
    
        const hasOpened = searchAndOpen(elements);
        setIsSearchMatched(hasOpened);
        setOpenSections(openIds);    
        if (hasOpened) {
            const firstOpenedId = Object.keys(openIds)[0];
            const accordionItem = document.getElementById(firstOpenedId);
            if (accordionItem) {
                accordionItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const filtered = filterElements(data.set.elements, debouncedSearchTerm);
            setFilteredData({ ...data.set, elements: filtered });
            openParents(data.set.elements, debouncedSearchTerm);
        } else {
            setFilteredData(data.set);
            setIsSearchMatched(true);
            setOpenSections({});
        }
    }, [debouncedSearchTerm, data.set, filterElements, openParents]);


    const filteredTreeList = useMemo(() => (
        isSearchMatched ? (
            <CampaignTreeList filteredData={filteredData} isOpen={openSections} searchTerm={debouncedSearchTerm} toggleAccordion={toggleAccordion} />
        ) : (
            <div className={styles.error_message}>No search results found.</div>
        )
    ), [filteredData, openSections, debouncedSearchTerm, toggleAccordion, isSearchMatched]);
    
    return (
        <div className={styles.container} ref={accordionRef}>
            <SearchBar searchQuery={searchTerm} handleSearchChange={(e) => setSearchTerm(e.target.value)} />
            {filteredTreeList}
        </div>
    );
};

export default CampaignAccordion;
