import React from 'react';
import LiveChartWrapper from '../../components/Chart/usage/LiveChartWrapper';
import AddLiveChart from '../../containers/AddLiveChart';

const Live = () => (
    <div className="full-page">
        <h1>Pomiary na żywo</h1>
        <AddLiveChart />
        <LiveChartWrapper />
    </div>
);

export default Live;