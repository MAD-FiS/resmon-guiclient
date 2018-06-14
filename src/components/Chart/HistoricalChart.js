import React from 'react';
import ChartEngine from './ChartEngine';
import ChartLegend from './ChartLegend';
import ChartTimeRange from './ChartTimeRange';
import ChartDeleteButton from './ChartDeleteButton';

const HistoricalChart = ({
    metric1, measurements1, hosts1,
    metric2, measurements2, hosts2,
    metrics, indeterminate, start, end,
    onMetric1Changed, onHostDismissedFromMetric1, onHostAddedToMetric1,
    onMetric2Changed, onHostDismissedFromMetric2, onHostAddedToMetric2,
    onRangeChanged, onChartClosed
}) => (
    <div className={`chart-container ${indeterminate ? 'indeterminate' : ''}`}>
        <div className="chart-container-main">
            <div className="chart-corner">
                <ChartTimeRange from={start} to={end} onChange={onRangeChanged} />
                <ChartDeleteButton onDelete={onChartClosed} />
            </div>
            <ChartEngine
                metric1={metrics[metric1]}
                metric1Measurements={measurements1}
                metric2={metrics[metric2]}
                metric2Measurements={measurements2}
            />
        </div>
        <div className="chart-container-side">
            <ChartLegend
                necessary={true}
                label="Metryka podstawowa"
                metrics={metrics}
                metric={metric1}
                hostsSelected={hosts1}
                onMetricChanged={onMetric1Changed}
                onHostAdded={onHostAddedToMetric1}
                onHostDismissed={onHostDismissedFromMetric1}
            />
            <ChartLegend
                label="Metryka dodatkowa"
                metrics={metrics}
                metric={metric2}
                hostsSelected={hosts2}
                onMetricChanged={onMetric2Changed}
                onHostAdded={onHostAddedToMetric2}
                onHostDismissed={onHostDismissedFromMetric2}
            />
        </div>
    </div>
);

export default HistoricalChart;