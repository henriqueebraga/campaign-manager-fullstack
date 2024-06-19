import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { mockLoadDataError, mockLoadDataSuccess } from './utils/testMockData';
import CampaignAccordion from './components/CampaignAccordion/CampaignAccordion';
import { Campaign, SetNodeElement, CampaignItem } from './types/types';

jest.mock('./hooks/useLoadData', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const useLoadData = require('./hooks/useLoadData').default;

describe('App component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders assignment heading', () => {
        useLoadData.mockImplementation(mockLoadDataSuccess);

        render(<App />);
        const headingElement = screen.getByText(/campaign evaluation tree$/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('displays data when available', () => {
        useLoadData.mockImplementation(mockLoadDataSuccess);

        render(<App />);
        const campaign1 = screen.getByText(/Campaign 1/i);
        const campaign2 = screen.getByText(/Campaign 2/i);
        expect(campaign1).toBeInTheDocument();
        expect(campaign2).toBeInTheDocument();
    });

    test('displays error message when data fetching fails', () => {
        useLoadData.mockImplementation(mockLoadDataError);

        render(<App />);
        const errorElement = screen.getByText(/An error occurred while fetching data./i);
        expect(errorElement).toBeInTheDocument();
    });

    const mockData: Campaign = {
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
    };


    test('renders CampaignAccordion component', () => {
        render(<CampaignAccordion data={mockData} />);
        expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    });

    test('updates search term correctly', async () => {
        render(<CampaignAccordion data={mockData} />);
        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'Campaign 1-1' } });
        await waitFor(() => expect(searchInput).toHaveValue('Campaign 1-1'));
    });

    test('filters data based on search term', async () => {
        render(<CampaignAccordion data={mockData} />);
        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'Campaign 1' } });
        await waitFor(() => expect(screen.getByText('Campaign 1')).toBeInTheDocument());
    });

    test('shows no results message when no matches found', async () => {
        render(<CampaignAccordion data={mockData} />);
        const searchInput = screen.getByRole('textbox');
        fireEvent.change(searchInput, { target: { value: 'Non-existent campaign' } });
        await waitFor(() => expect(screen.getByText('No search results found.')).toBeInTheDocument());
    });
})
