import React from 'react';
import HostList from '../../containers/HostList';
import RefreshHostsButton from '../../containers/RefreshHostsButton';

const Metrics = () => (
    <div className="full-page">
        <h1>Hosty i Metryki</h1>
        <HostList />
        <RefreshHostsButton />
    </div>
);

export default Metrics;
