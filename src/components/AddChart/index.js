import React from 'react';
import { Button, Select } from 'antd';
import './index.less';

class AddChart extends React.PureComponent {

    state = {
        value: undefined
    };

    onChange = (value) => {
        this.setState({ value });
    }

    onButtonClick = () => {
        this.props.onAdd({ metric: this.state.value });
        this.setState({ value: undefined });
    }

    render() {
        const { metrics } = this.props;
        const { value } = this.state;
        return (
            <div className="add-chart">
                <Select className="add-chart-select" placeholder="Wybierz metrykę" allowClear={true} showSearch={true} value={value} onChange={this.onChange}>
                    {metrics.map(metric => (
                        <Select.Option key={metric} value={metric}>{metric}</Select.Option>
                    ))}
                </Select>
                <Button className="add-chart-button" type="primary" onClick={this.onButtonClick} disabled={!value}>Dodaj wykres</Button>
            </div>
        );
    }

}

export default AddChart;
