import React from 'react';
import ChartEngine from './ChartEngine';
import ChartLegend from './ChartLegend';
import ChartDeleteButton from './ChartDeleteButton';

const LiveChart = ({
    onChartClosed, onHostAdded, onHostDismissed, onMetricChanged,
    hosts, invalidated, measurements, metric, metrics
}) => (
    <div className={`chart-container ${invalidated ? 'indeterminate' : ''}`}>
        <div className="chart-container-main">
            <div className="chart-corner">
                <ChartDeleteButton onDelete={onChartClosed} />
            </div>
            <ChartEngine
                metric1={metrics[metric]}
                metric1Measurements={measurements}
                metric1Hosts={hosts}
                navigatorDisabled={true}
                withDataLabel={true}
            />
        </div>
        <div className="chart-container-side">
            <ChartLegend
                necessary={true}
                label="Metryka"
                metrics={metrics}
                metric={metric}
                hosts={hosts}
                onMetricChanged={onMetricChanged}
                onHostAdded={onHostAdded}
                onHostDismissed={onHostDismissed}
            />
        </div>
    </div>
);

export default LiveChart;