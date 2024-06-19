import React from 'react';
import { NodeElement } from '../../types/types';
import Highlight from '../Highlight/Highlight';
import styles from './campaignNode.module.css';

type CampaignNodeProps = {
    node: NodeElement;
    searchQuery: string;
};

const CampaignNode: React.FC<CampaignNodeProps> = ({ node, searchQuery }) => {
    return (
        <div key={node.campaignId}>
            <div className={styles.node_item}>
                <img
                    loading='lazy'
                    className={styles.icon}
                    src='/promotion-icon.svg'
                    alt='promotion-icon'
                />
                <Highlight text={node.name} searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default CampaignNode;
