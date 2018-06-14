import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sync';
import { getLiveChartsArray, getMetrics } from '../../reducers';
import AddLiveChart from '../../containers/AddLiveChart';
import { LiveChart } from '../../components/Chart';

const Live = ({ removeLiveChart, setLiveChartMetric, addLiveChartHost, removeLiveChartHost, metrics, charts }) => (
    <div className="full-page">
        <h1>Pomiary na żywo</h1>
        <AddLiveChart />
        {charts.map(c => (
            <LiveChart
                key={c.id}
                onChartClosed={() => removeLiveChart(c.id)}
                onMetricChanged={metric => setLiveChartMetric({ metric }, c.id)}
                onHostAdded={host => addLiveChartHost({ host }, c.id)}
                onHostDismissed={host => removeLiveChartHost(c.id, host)}
                metrics={metrics}
                {...c}
            />
        ))}
    </div>
);

const mapStateToProps = (state) => ({
    charts: getLiveChartsArray(state),
    metrics: getMetrics(state)
});

const mapDispatchToProps = {
    removeLiveChart: actions.removeLiveChart,
    setLiveChartMetric: actions.setLiveChartMetric,
    addLiveChartHost: actions.addLiveChartHost,
    removeLiveChartHost: actions.removeLiveChartHost
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);
