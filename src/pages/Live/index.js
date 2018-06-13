import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sync';
import { getLiveChartsArray, getMetricsAll } from '../../reducers';
import AddLiveChart from '../../containers/AddLiveChart';
import LiveChart from '../../components/Chart/usage/LiveChartWrapper';

const Live = ({ removeLiveChart, changeMetricLiveChart, addHostLiveChart, removeHostLiveChart, metrics, liveCharts }) => (
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
                metrices={metrics}
                {...c}
            />
        ))}
    </div>
);

const mapStateToProps = (state) => ({
    liveCharts: getLiveChartsArray(state),
    metrics: getMetricsAll(state)
});

const mapDispatchToProps = {
    removeLiveChart: actions.removeLiveChart,
    changeMetricLiveChart: actions.setLiveChartMetric,
    addHostLiveChart: actions.addLiveChartHost,
    removeHostLiveChart: actions.removeLiveChartHost
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);
