import React from 'react';
import ChartEngine from './ChartEngine';
import ChartLegend from './ChartLegend';
import ChartDeleteButton from './ChartDeleteButton';

const LiveChart = ({
    metricInfo, metricMeasurements, metricHostsSelected,
    metrices, indeterminate, lastUpdate,
    onMetricChanged, onHostDismissed, onHostAdded,
    onChartClosed
}) => (
    <div className={`chart-container ${indeterminate ? 'indeterminate' : ''}`}>
        <div className="chart-container-main">
            <div className="chart-corner">
                <ChartDeleteButton onDelete={onChartClosed} />
            </div>
            <ChartEngine
                metric1Info={metricInfo}
                metric1Measurements={metricMeasurements}
                metric1LastUpdate={lastUpdate}
                metric1HostsSelected={metricHostsSelected}
                navigatorDisabled={true}
                withDataLabel={true}
            />
        </div>
        <div className="chart-container-side">
            <ChartLegend
                necessary
                label="Metryka"
                metrices={metrices}
                metricInfo={metricInfo}
                hostsSelected={metricHostsSelected}
                onMetricChanged={onMetricChanged}
                onHostAdded={onHostAdded}
                onHostDismissed={onHostDismissed}
            />
        </div>
    </div>
)

export default LiveChart;