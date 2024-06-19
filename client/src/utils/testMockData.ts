// utils/mockData.js
export const mockLoadDataError = () => ({
    loading: false,
    data: null,
    error: 'An error occurred while fetching data.'
});

export const mockLoadDataSuccess = () => ({
    loading: false,
    data: {
        id: 1,
        set: {
            type: "SET",
            name: "Root",
            elements: [
                {
                    type: "CAMPAIGN",
                    campaignId: 1,
                    name: "Campaign 1"
                },
                {
                    type: "CAMPAIGN",
                    campaignId: 2,
                    name: "Campaign 2"
                }
            ],
            groupId: 1
        }
    },
    error: null
});
