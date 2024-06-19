import React from 'react';
import Highlight from '../Highlight/Highlight';
import styles from './campaignTreeList.module.css';
import CampaignNode from '../CampaignNode/CampaignNode';
import { NodeElement, SetNodeElement } from '../../types/types';

interface CampaignTreeListProps {
    filteredData: NodeElement;
    isOpen: { [key: string]: boolean };
    searchTerm: string;
    toggleAccordion: (id: string) => void;
}

const CampaignTreeList: React.FC<CampaignTreeListProps> = ({ filteredData, isOpen, searchTerm, toggleAccordion }) => {
    const renderElements = (elements: NodeElement[], parentId?: string) => {
        if (!Array.isArray(elements)) {
            return null;
        }

        return elements
            .sort((a: NodeElement) => (a.type === 'SET' ? 1 : -1))
            .map((element: NodeElement, index: number) => {
                if ((element as SetNodeElement).type === 'SET') {
                    const setElement = element as SetNodeElement;
                    return (
                        <div key={setElement.groupId ?? index} className={styles.accordion_item} id={setElement.groupId?.toString() ?? ''}>
                            <div
                                className={styles.accordion_header}
                                onClick={() => setElement.groupId && toggleAccordion(setElement.groupId.toString())}
                            >
                                {isOpen[setElement.groupId ?? index] ? <span className={styles.collapsed}>-</span> : <span className={styles.closed}>+</span> }
                                <Highlight text={setElement.name} searchQuery={searchTerm} />
                            </div>
                            {isOpen[setElement.groupId ?? index] && (
                                <div className={styles.accordion_content}>
                                    {renderElements(setElement.elements || [], setElement.groupId?.toString() ?? '')}
                                </div>
                            )}
                        </div>
                    );
                } else if ((element as NodeElement).type === 'CAMPAIGN') {
                    const campaignElement = element as NodeElement;
                    return (
                        <div key={campaignElement.campaignId} className="campaign-item" style={{ display: parentId && isOpen[parentId] ? 'block' : 'none' }}>
                            <CampaignNode node={campaignElement} searchQuery={searchTerm} />
                        </div>
                    );
                }
                return null;
            });
    };

    return (
        <div className={styles.accordion}>
            {filteredData ? renderElements(filteredData.elements || [], undefined) : null}
        </div>
    );
};

export default CampaignTreeList;
