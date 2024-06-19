export type CampaignItem = {
    type: string;
    name: string;
    campaignId?: number;
}

export type SetNodeElement = {
    type: string;
    name: string;
    elements?: (CampaignItem | SetNodeElement)[];
    groupId?: number;
}

export type Campaign = {
    set: SetNodeElement;
}


export type NodeElement = {
    type: string;
    name: string;
    campaignId?: number;
    groupId?: number;
    elements?: NodeElement[];
}