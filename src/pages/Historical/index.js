import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/sync';
import { getHistoricalChartsArray, getMetrics } from '../../reducers';
import AddHistoricalChart from '../../containers/AddHistoricalChart';
import { HistoricalChart } from '../../components/Chart';
import NoCharts from '../../components/NoCharts';

const Live = ({
    addHistoricalChartHost1, addHistoricalChartHost2, removeHistoricalChartHost1,
    removeHistoricalChartHost2, setHistoricalChartMetric1, setHistoricalChartMetric2,
    removeHistoricalChart, setHistoricalChartRange, metrics, charts
}) => (
    <div className="full-page">
        <h1>Pomiary historyczne</h1>
        <AddHistoricalChart />
        {charts.length ? charts.map(c => (
            <HistoricalChart
                key={c.id}
                onMetric1Changed={(metric) => setHistoricalChartMetric1({ metric }, c.id)}
                onMetric2Changed={(metric) => setHistoricalChartMetric2({ metric }, c.id)}
                onHostAddedToMetric1={host => addHistoricalChartHost1({ host }, c.id)}
                onHostAddedToMetric2={host => addHistoricalChartHost2({ host }, c.id)}
                onHostDismissedFromMetric1={host => removeHistoricalChartHost1(c.id, host)}
                onHostDismissedFromMetric2={host => removeHistoricalChartHost2(c.id, host)}
                onRangeChanged={(start, end) => setHistoricalChartRange({ start, end }, c.id)}
                onChartClosed={() => removeHistoricalChart(c.id)}
                metrics={metrics}
                {...c}
            />
        )) : <NoCharts />}
    </div>
);

const mapStateToProps = (state) => ({
    charts: getHistoricalChartsArray(state),
    metrics: getMetrics(state)
});

const mapDispatchToProps = {
    addHistoricalChartHost1: actions.addHistoricalChartHost1,
    addHistoricalChartHost2: actions.addHistoricalChartHost2,
    removeHistoricalChartHost1: actions.removeHistoricalChartHost1,
    removeHistoricalChartHost2: actions.removeHistoricalChartHost2,
    setHistoricalChartMetric1: actions.setHistoricalChartMetric1,
    setHistoricalChartMetric2: actions.setHistoricalChartMetric2,
    removeHistoricalChart: actions.removeHistoricalChart,
    setHistoricalChartRange: actions.setHistoricalChartRange
};

export default connect(mapStateToProps, mapDispatchToProps)(Live);
