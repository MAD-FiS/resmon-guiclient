import React from 'react';
import { Icon } from 'antd';
import MetricFilter from '../../MetricFilter';

export class Metrics extends React.Component
{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        visible: false,
        filtered: false,
        selected: [],
        dataSource: this.props.dataSource
    });

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.dataSource !== nextProps.dataSource) {
            this.setState({
                dataSource: this.applyFilters(nextProps.dataSource, this.state.selected)
            });
        }
    }

    onSelect = (selected) => {
        this.setState({
            filtered: !!selected.length,
            visible: false,
            selected,
            dataSource: this.applyFilters(this.props.dataSource, selected),
        });
    };

    applyFilters = (dataSource, selected) => {
        if(!selected.length) {
            return dataSource;
        }
        return dataSource.map((host) => {
            const matchedIndex = host.metrics.findIndex(metric => (
                selected.some(oneSelected => oneSelected === metric.id)
            ));
            if (matchedIndex < 0) {
                return null;
            }
            const newMetrics = host.metrics.slice();
            newMetrics[matchedIndex].found = true;
            return {
                ...host,
                metrics: newMetrics
            };
        }).filter(host => !!host);
    };

    onClearSelect = () => {
        this.setState(this.getInitialState());
    };

    onDismiss = () => {
        if (this.state.visible) {
            this.setState({ visible: false });
        }
    };

    renderChildren = (columns) => {
        const { dataSource } = this.state;
        return React.Children.map(this.props.children, (child) => {
            // eslint-disable-next-line
            const {selfProps, ...children} = this.props;
            return React.cloneElement(child, {...selfProps, columns, dataSource});
        });
    };

    render() {
        const columns = this.props.columns.map(column => {
            if(column.key === 'metrics') {
                return {
                    ...column,
                    filterDropdown: <MetricFilter
                        metrics={this.props.metrics} onSelect={this.onSelect}
                        onClear={this.onClearSelect} onDismiss={this.onDismiss}
                    />,
                    filterIcon: <Icon
                        onClick={e => !this.state.visible && e.stopPropagation()} type="tag-o"
                        style={{ color: this.state.filtered ? '#84e985' : '#aaa' }}
                    />,
                    filterDropdownVisible: this.state.visible,
                    onFilterDropdownVisibleChange: (visible) => {
                        if (visible) {
                            this.setState({
                                visible
                            });
                        }
                    }
                };
            }
            return column;
        });
        return <div>{this.renderChildren(columns)}</div>;
    }
}
