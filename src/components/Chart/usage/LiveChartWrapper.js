import React from 'react';
import moment from 'moment';
import { LiveChart } from '../index';

class LiveChartWrapper extends React.PureComponent {

    constructor(props) {
        super(props);
        this.updateTime = moment().format();
        this.state = {
            indeterminate: false,
            metricMeasurements: {},
            lastUpdate: null
        };
    }

    clearTick() {
        this.timeout && clearInterval(this.timeout);
    }

    loadPart() {
        this.props.getData(
            this.updateTime,
            undefined,
            this.props.metricName,
            this.props.metricHostsSelected
        ).then(data => {
            const concated = data.reduce((c, d) => c.concat(d), []);
            if (concated.map(d => d.data.length).reduce((c, l) => c + l, 0)) {
                this.updateTime = moment().format();
                const processed = concated.reduce((c, d) => ({
                    ...c,
                    [d.hostname]: d.data
                }), {});
                this.setState({
                    metricMeasurements: this.props.metricHostsSelected.reduce((c, host) => ({
                        ...c,
                        [host]: [
                            ...this.state.metricMeasurements[host],
                            ...processed[host]
                        ]
                    }), {}),
                    lastUpdate: Object.entries(processed).reduce((c, [ host, d ]) => ({
                        ...c,
                        [host]: d.length
                    }), {})
                });
            }
        });
    }

    loadFull() {
        if (this.props.metricHostsSelected.length) {
            this.setState({ indeterminate: true });
            this.props.getData(
                moment().subtract(1, 'hours').format(),
                undefined,
                this.props.metricName,
                this.props.metricHostsSelected
            ).then(data => {
                this.updateTime = moment().format();
                this.setState({
                    indeterminate: false,
                    metricMeasurements: data.reduce((c, d) => c.concat(d), []).reduce((c, d) => ({
                        ...c,
                        [d.hostname]: d.data
                    }), {}),
                    lastUpdate: null
                });
                this.clearTick();
                this.timeout = setInterval(() => this.loadPart(), 5 * 1000);
            });
        }
        else {
            this.setState({
                indeterminate: false,
                lastUpdate: null,
                metricMeasurements: {}
            });
            this.updateTime = moment().format();
        }
    }

    componentDidMount() {
        this.loadFull();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.metricHostsSelected !== prevProps.metricHostsSelected
            || this.props.metricName !== prevProps.metricName
        ) {
            this.loadFull();
        }
    }

    componentWillUnmount() {
        this.clearTick();
    }

    render() {
        return <LiveChart
            {...this.state}
            metrices={Object.keys(this.props.metrices)}
            metricInfo={this.props.metrices[this.props.metricName]}
            metricHostsSelected={this.props.metricHostsSelected}
            onMetricChanged={this.props.onMetricChanged}
            onChartClosed={this.props.onChartClosed}
            onHostAdded={this.props.onHostAdded}
            onHostDismissed={this.props.onHostDismissed}
        />
    }

}

export default LiveChartWrapper;
