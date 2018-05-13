import React from 'react';
import moment from 'moment';
import { HistoricalChart } from '../index';
import { getData, metrices } from './utils';

class HistoricalChartWrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        const matric1Name = 'CPU';
        const metric1HostsSelected = [
            'host2.agh.edu.pl',
            'host5.agh.edu.pl'
        ];
        const rangeFrom = moment('2018-01-09 00:00').format();
        const rangeTo = moment('2018-01-09 02:00').format();
        this.state = {
            indeterminate: false,
            metrices: Object.keys(metrices),
            metric1Info: Object.assign({
                name: matric1Name
            }, metrices[matric1Name]),
            metric1HostsSelected: metric1HostsSelected,
            metric1Measurements: getData(rangeFrom, rangeTo, matric1Name, metric1HostsSelected),
            metric2Info: null,
            metric2HostsSelected: null,
            metric2Measurements: null,
            rangeFrom: rangeFrom,
            rangeTo: rangeTo
        };
    }

    componentWillUnmount() {
        this.clearDataTimeout();
    }

    clearDataTimeout() {
        if (this.dataTimeout) {
            clearTimeout(this.dataTimeout);
        }
    }

    loadData() {
        this.clearDataTimeout();
        this.dataTimeout = setTimeout(() => {
            this.setState({
                indeterminate: false,
                metric1Measurements: getData(
                    this.state.rangeFrom,
                    this.state.rangeTo,
                    this.state.metric1Info.name,
                    this.state.metric1HostsSelected
                ),
                metric2Measurements: this.state.metric2Info ? getData(
                    this.state.rangeFrom,
                    this.state.rangeTo,
                    this.state.metric2Info.name,
                    this.state.metric2HostsSelected
                ) : null
            });
        }, 1500);
    }

    onMetric1Changed = (metric) => {
        this.setState({
            indeterminate: true,
            metric1Info: Object.assign({
                name: metric
            }, metrices[metric]),
            metric1HostsSelected: []
        }, this.loadData);
    }

    onMetric2Changed = (metric) => {
        this.setState({
            indeterminate: true,
            metric2Info: metric ? Object.assign({
                name: metric
            }, metrices[metric]) : null,
            metric2HostsSelected: metric ? [] : null
        }, this.loadData);
    }

    onChartClosed = () => {
        alert('Closed!');
    }

    onHostAddedToMetric1 = (host) => {
        this.setState({
            indeterminate: true,
            metric1HostsSelected: [ ...this.state.metric1HostsSelected, host ]
        }, this.loadData);
    }

    onHostAddedToMetric2 = (host) => {
        this.setState({
            indeterminate: true,
            metric2HostsSelected: [ ...this.state.metric2HostsSelected, host ]
        }, this.loadData);
    }

    onHostDismissedFromMetric1 = (host) => {
        const list = this.state.metric1HostsSelected;
        const pos = list.indexOf(host);
        this.setState({
            indeterminate: true,
            metric1HostsSelected: [ ...list.slice(0, pos), ...list.slice(pos + 1) ]
        }, this.loadData);
    }

    onHostDismissedFromMetric2 = (host) => {
        const list = this.state.metric2HostsSelected;
        const pos = list.indexOf(host);
        this.setState({
            indeterminate: true,
            metric2HostsSelected: [ ...list.slice(0, pos), ...list.slice(pos + 1) ]
        }, this.loadData);
    }

    onRangeChanged = (rangeFrom, rangeTo) => {
        this.setState({
            indeterminate: true,
            rangeFrom,
            rangeTo
        }, this.loadData);
    }

    render() {
        return <HistoricalChart
            {...this.state}
            onMetric1Changed={this.onMetric1Changed}
            onMetric2Changed={this.onMetric2Changed}
            onChartClosed={this.onChartClosed}
            onHostAddedToMetric1={this.onHostAddedToMetric1}
            onHostAddedToMetric2={this.onHostAddedToMetric2}
            onHostDismissedFromMetric1={this.onHostDismissedFromMetric1}
            onHostDismissedFromMetric2={this.onHostDismissedFromMetric2}
            onRangeChanged={this.onRangeChanged}
        />
    }

}

export default HistoricalChartWrapper;
