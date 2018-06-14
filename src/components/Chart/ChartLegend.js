import React from 'react';
import { Select, List, Icon } from 'antd';
import strToColor from '../../utils/strToColor';

const { Option } = Select;

const MetricHeader = ({ allowClear, label, value, onChange, metrics }) => (
    <div className="metric-header">
        <strong className="metric-name">{label}:</strong>
        <Select
            showSearch={true}
            allowClear={allowClear}
            value={value}
            onChange={onChange}
            placeholder="Wybierz metrykę"
            className="metric-selector"
        >
            {metrics.map(m => <Option key={m} value={m}>{m}</Option>)}
        </Select>
    </div>
);

const HostsSelector = ({ selected, onDismiss }) => (
    <List
        size="small"
        dataSource={selected}
        renderItem={host => (
            <List.Item
                actions={[
                    <a key="close" onClick={onDismiss.bind(this, host)}><Icon type="close" /></a>
                ]}
            >
                <div className="series-dot" style={{ backgroundColor: strToColor(host) }}></div>
                {host}
            </List.Item>
        )}
    />
);

class HostsAdder extends React.PureComponent {

    state = {};

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            this.state.value
            && (
                nextProps.all.indexOf(this.state.value) === -1
                || nextProps.selected.indexOf(this.state.value) !== -1
            )
        ) {
            this.setState({ value: undefined });
        }
    }

    onValueChange = (value) => {
        this.setState({ value });
    }

    onSubmit = () => {
        if (this.state.value) {
            this.props.onSubmit(this.state.value);
        }
    }

    render() {
        const { all, selected } = this.props;
        const { value } = this.state;
        const dropdownValues = all.filter(h => selected.indexOf(h) === -1);
        return (
            <div className="hosts-adder">
                <Select showSearch={true} allowClear placeholder="Wybierz host" value={value} onChange={this.onValueChange} className="hosts-selector">
                    {dropdownValues.map(h => <Option key={h} value={h}>{h}</Option>)}
                </Select>
                <a className="add-button" onClick={this.onSubmit}><Icon type="plus" /></a>
            </div>
        );
    }

}

const ChartLegend = ({ necessary, label, metrics, metric, hosts, onMetricChanged, onHostAdded, onHostDismissed }) => (
    <div className="chart-legend">
        <MetricHeader allowClear={!necessary} label={label} value={metric} onChange={onMetricChanged} metrics={Object.keys(metrics)} />
        {necessary || metric ?
            <HostsSelector selected={hosts} onDismiss={onHostDismissed} />
            : null}
        {necessary || metric ?
            <HostsAdder all={Object.keys(metrics[metric])} selected={hosts} onSubmit={onHostAdded} />
            : null}
    </div>
);

export default ChartLegend;