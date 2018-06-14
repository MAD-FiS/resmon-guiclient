import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import ChartEngine from './ChartEngine';
import ChartLegend from './ChartLegend';
import ChartTimeRange from './ChartTimeRange';
import ChartDeleteButton from './ChartDeleteButton';

const exportToCsv = (metric1, metric2, measurements1, measurements2) => {
    let bySecond = Object.values(measurements1).reduce((c, d) => c.concat(d), []);
    if (measurements2) {
        bySecond = bySecond.concat(Object.values(measurements1).reduce((c, d) => c.concat(d), []));
    }
    bySecond = bySecond.map(d => moment(d.time).unix())
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
    let labels = [ 'time', ...Object.keys(measurements1).map(m => metric1 + ':' + m) ];
    if (measurements2) {
        labels = labels.concat(Object.keys(measurements2).map(m => metric2 + ':' + m));
    }
    const arr2d = bySecond.map(() => Array.from({ length: labels.length }));
    const bySecondToIndex = bySecond.reduce((c, v, i) => Object.assign({ [v]: i }, c), {});
    const labelsToIndex = labels.reduce((c, v, i) => Object.assign({ [v]: i + 1 }, c), {});
    for (let i = 0; i < arr2d.length; ++i) {
        arr2d[i][0] = moment.unix(bySecond[i]).toISOString();
    }
    for (const host of Object.keys(measurements1)) {
        for (const point of Object.keys(measurements1[host])) {
            arr2d[bySecondToIndex[moment(point.time).unix()]][labelsToIndex[metric1 + ':' + host]] = point.value;
        }
    }
    const toExport = [ labels, ...arr2d ];
    const str = toExport.map(v => v.join(',')).join('\r\n');
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', 'data:text/csv;base64,' + window.btoa(str));
    exportLink.appendChild(document.createTextNode('test.csv'));
    document.getElementsByTagName('body')[0].appendChild(exportLink);
    exportLink.click();
    exportLink.remove();
};

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
                <a className="chart-csv-button" onClick={() => exportToCsv(metric1, metric2, measurements1, measurements2)}>
                    <Icon type="export" />
                </a>
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
                hosts={hosts1}
                onMetricChanged={onMetric1Changed}
                onHostAdded={onHostAddedToMetric1}
                onHostDismissed={onHostDismissedFromMetric1}
            />
            <ChartLegend
                label="Metryka dodatkowa"
                metrics={metrics}
                metric={metric2}
                hosts={hosts2}
                onMetricChanged={onMetric2Changed}
                onHostAdded={onHostAddedToMetric2}
                onHostDismissed={onHostDismissedFromMetric2}
            />
        </div>
    </div>
);

export default HistoricalChart;