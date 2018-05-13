import React from 'react';
import { Select, List, Icon } from 'antd';
import strToColor from '../../utils/strToColor';

const { Option } = Select;

const MetricHeader = ({ allowClear, label, value, onChange, metrices }) => (
    <div className="metric-header">
        <strong className="metric-name">{label}:</strong>
        <Select
            showSearch
            allowClear={allowClear}
            value={value}
            onChange={onChange}
            placeholder="Wybierz metrykę"
            className="metric-selector"
        >
            {metrices.map(m => <Option key={m} value={m}>{m}</Option>)}
        </Select>
    </div>
);

const HostsSelector = ({ all, selected, onDismiss }) => (
    <List
        size="small"
        dataSource={selected}
        renderItem={host => (
            <List.Item
                actions={[
                    <a onClick={onDismiss.bind(this, host)}><Icon type="close" /></a>
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

    componentWillReceiveProps(nextProps) {
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
                <Select showSearch allowClear placeholder="Wybierz host" value={value} onChange={this.onValueChange} className="hosts-selector">
                    {dropdownValues.map(h => <Option key={h} value={h}>{h}</Option>)}
                </Select>
                <a className="add-button" onClick={this.onSubmit}><Icon type="plus" /></a>
            </div>
        );
    }

}

const ChartLegend = ({ necessary, label, metrices, metricInfo, hostsSelected, onMetricChanged, onHostAdded, onHostDismissed }) => (
    <div className="chart-legend">
        <MetricHeader allowClear={!necessary} label={label} value={metricInfo ? metricInfo.name : undefined} onChange={onMetricChanged} metrices={metrices} />
        {necessary || metricInfo ?
            <HostsSelector all={metricInfo.hosts} selected={hostsSelected} onDismiss={onHostDismissed} />
        : null}
        {necessary || metricInfo ?
            <HostsAdder all={metricInfo.hosts} selected={hostsSelected} onSubmit={onHostAdded} />
        : null}
    </div>
);

export default ChartLegend;