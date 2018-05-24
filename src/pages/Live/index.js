import React from 'react';
import { connect } from 'react-redux';
import { removeLiveChart, changeMetricLiveChart, addHostLiveChart, removeHostLiveChart, getData } from '../../actions/liveCharts';
import { getLiveChartsArray, getMetricsAll } from '../../reducers';
import AddLiveChart from '../../containers/AddLiveChart';
import LiveChart from '../../components/Chart/usage/LiveChartWrapper';

const Live = ({ liveCharts, removeLiveChart, changeMetricLiveChart, addHostLiveChart, removeHostLiveChart, metrices, getData }) => (
    <div className="full-page">
        <h1>Pomiary na żywo</h1>
        <AddLiveChart />
        {liveCharts.map(c => (
            <LiveChart
                key={c.id}
                onChartClosed={() => removeLiveChart(c.id)}
                onMetricChanged={metric => changeMetricLiveChart(c.id, metric)}
                onHostAdded={host => addHostLiveChart(c.id, host)}
                onHostDismissed={host => removeHostLiveChart(c.id, host)}
                metrices={metrices}
                getData={getData}
                {...c}
            />
        ))}
    </div>
);

const mapStateToProps = (state) => ({
    liveCharts: getLiveChartsArray(state),
    metrices: getMetricsAll(state)
});

const mapDispatchToProps = {
    removeLiveChart,
    changeMetricLiveChart,
    addHostLiveChart,
    removeHostLiveChart,
    getData
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);
