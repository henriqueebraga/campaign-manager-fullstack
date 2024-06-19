import React from 'react';
import useLoadData from './hooks/useLoadData';
import CampaignAccordion from './components/CampaignAccordion/CampaignAccordion';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './App.css';

const App: React.FC = () => {
    const { loading, data, error } = useLoadData();

    return (
        <div className="App">
            <header className="App-header">
                <h2>Campaign Evaluation Tree</h2>
            </header>
            <main className="App-main">
                {loading && <LoadingSpinner />}
                {error && <p className='App-error-message'>{error}</p>}
                {data && <CampaignAccordion data={data} />}
            </main>
        </div>
    );
};

export default App;
