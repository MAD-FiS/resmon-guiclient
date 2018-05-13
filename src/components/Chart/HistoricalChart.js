import React from 'react';
import ChartEngine from './ChartEngine';
import ChartLegend from './ChartLegend';
import ChartTimeRange from './ChartTimeRange';
import ChartDeleteButton from './ChartDeleteButton';

const HistoricalChart = ({
    metric1Info, metric1Measurements, metric1HostsSelected,
    metric2Info, metric2Measurements, metric2HostsSelected,
    metrices, indeterminate, rangeFrom, rangeTo,
    onMetric1Changed, onHostDismissedFromMetric1, onHostAddedToMetric1,
    onMetric2Changed, onHostDismissedFromMetric2, onHostAddedToMetric2,
    onRangeChanged, onChartClosed
}) => (
    <div className={`chart-container ${indeterminate ? 'indeterminate' : ''}`}>
        <div className="chart-container-main">
            <div className="chart-corner">
                <ChartTimeRange from={rangeFrom} to={rangeTo} onChange={onRangeChanged} />
                <ChartDeleteButton onDelete={onChartClosed} />
            </div>
            <ChartEngine
                metric1Info={metric1Info}
                metric1Measurements={metric1Measurements}
                metric2Info={metric2Info}
                metric2Measurements={metric2Measurements}
            />
        </div>
        <div className="chart-container-side">
            <ChartLegend
                necessary
                label="Metryka podstawowa"
                metrices={metrices}
                metricInfo={metric1Info}
                hostsSelected={metric1HostsSelected}
                onMetricChanged={onMetric1Changed}
                onHostAdded={onHostAddedToMetric1}
                onHostDismissed={onHostDismissedFromMetric1}
            />
            <ChartLegend
                label="Metryka dodatkowa"
                metrices={metrices}
                metricInfo={metric2Info}
                hostsSelected={metric2HostsSelected}
                onMetricChanged={onMetric2Changed}
                onHostAdded={onHostAddedToMetric2}
                onHostDismissed={onHostDismissedFromMetric2}
            />
        </div>
    </div>
)

export default HistoricalChart;