import React from 'react';
import moment from 'moment';
import { LiveChart } from '../index';
import { getData, metrices } from './utils';

class LiveChartWrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        const metricName = 'CPU';
        const metricHostsSelected = [
            'host2.agh.edu.pl',
            'host5.agh.edu.pl'
        ];
        this.updateTime = moment().format();
        this.state = {
            indeterminate: false,
            metrices: Object.keys(metrices),
            metricInfo: Object.assign({
                name: metricName
            }, metrices[metricName]),
            metricHostsSelected: metricHostsSelected,
            metricMeasurements: getData(moment().subtract(5, 'minutes').format(), this.updateTime, metricName, metricHostsSelected),
            lastUpdate: null
        };
    }

    componentDidMount() {
        this.setUpdates();
    }

    componentWillUnmount() {
        this.clearTimeouts();
    }

    clearTimeouts() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        if (this.dataTimeout) {
            clearTimeout(this.dataTimeout);
        }
    }

    setUpdates() {
        this.updateTimeout = setTimeout(() => {
            const prevTime = this.updateTime;
            this.updateTime = moment().format();
            const newPoints = getData(prevTime, this.updateTime, this.state.metricInfo.name, this.state.metricHostsSelected);
            const metricMeasurements = this.state.metricHostsSelected.reduce((cumm, host) => Object.assign({
                [host]: [ ...this.state.metricMeasurements[host], ...newPoints[host] ]
            }, cumm), {});
            const lastUpdate = this.state.metricHostsSelected.reduce((cumm, host) => Object.assign({
                [host]: newPoints[host].length
            }, cumm), {});
            this.setState({
                metricMeasurements,
                lastUpdate
            }, this.setUpdates);
        }, 5000);
    }

    loadData() {
        this.clearTimeouts();
        this.dataTimeout = setTimeout(() => {
            this.setState({
                indeterminate: false,
                metricMeasurements: getData(
                    moment().subtract(5, 'minutes').format(),
                    moment().format(),
                    this.state.metricInfo.name,
                    this.state.metricHostsSelected
                )
            }, this.setUpdates);
        }, 1500);
    }

    onMetricChanged = (metric) => {
        this.clearTimeouts();
        this.setState({
            indeterminate: true,
            metricInfo: Object.assign({
                name: metric
            }, metrices[metric]),
            metricHostsSelected: []
        }, this.loadData);
    }

    onChartClosed = () => {
        alert('Closed!');
    }

    onHostAdded = (host) => {
        this.clearTimeouts();
        this.setState({
            indeterminate: true,
            metricHostsSelected: [ ...this.state.metricHostsSelected, host ]
        }, this.loadData);
    }

    onHostDismissed = (host) => {
        const list = this.state.metricHostsSelected;
        const pos = list.indexOf(host);
        this.clearTimeouts();
        this.setState({
            indeterminate: true,
            metricHostsSelected: [ ...list.slice(0, pos), ...list.slice(pos + 1) ]
        }, this.loadData);
    }

    render() {
        return <LiveChart
            {...this.state}
            onMetricChanged={this.onMetricChanged}
            onChartClosed={this.onChartClosed}
            onHostAdded={this.onHostAdded}
            onHostDismissed={this.onHostDismissed}
        />
    }

}

export default LiveChartWrapper;
