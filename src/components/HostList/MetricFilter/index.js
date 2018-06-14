import React from 'react';
import { Select, Button } from 'antd';
const { Option, OptGroup } = Select;

class MetricFilter extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    onChangeSelect = (selected) => {
        this.setState({
            selected
        });
    };

    onClear = () => {
        this.setState({
            selected: []
        });
        this.props.onClear();
    };

    onSelect = () => {
        this.props.onSelect(this.state.selected);
    };

    componentDidMount() {
        window.addEventListener('click', this.props.onDismiss);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.props.onDismiss);
    }

    render() {
        const { metrics } = this.props;
        return (
            <div className="metric-filter-select" onClick={e => e.stopPropagation()}>
                <Select
                    mode="multiple"
                    placeholder="Wybierz metryki"
                    onChange={this.onChangeSelect}
                    value={this.state.selected}
                >
                    <OptGroup label="bazowe">
                        {Object.values(metrics.base).map(metric => <Option key={metric}>{metric}</Option>)}
                    </OptGroup>
                    <OptGroup label="złożone">
                        {Object.values(metrics.complex).map(metric => <Option key={metric}>{metric}</Option>)}
                    </OptGroup>
                </Select>
                <Button type="primary" onClick={this.onSelect}>Wybierz</Button>
                {
                    this.state.selected.length > 0 ? <Button type="default" onClick={this.onClear}>Wyczyść</Button> : null
                }
            </div>
        );
    }
}

export default MetricFilter;
