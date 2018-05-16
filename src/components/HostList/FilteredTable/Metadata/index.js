import React from 'react';
import { Icon } from 'antd';
import MetadataFilter from '../../MetadataFilter';

export class Metadata extends React.Component
{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        visible: false,
        filtered: false,
        type: '',
        value: '',
        dataSource: this.props.dataSource
    });

    componentWillReceiveProps(nextProps) {
        if(this.props.dataSource !== nextProps.dataSource) {
            this.setState({
                dataSource: this.applyFilters(nextProps.dataSource, this.state.type, this.state.value)
            });
        }
    }

    onSelect = (type, value) => {
        this.setState({
            filtered: !!value,
            visible: false,
            type,
            value,
            dataSource: this.applyFilters(this.props.dataSource, type, value),
        });
    };

    applyFilters = (dataSource, type, value) => {
        if(typeof value === 'undefined' || value === '') {
            this.onClearSelect();
            return dataSource;
        }
        const reg = new RegExp(value, 'gi');
        return dataSource.map((host) => {
            const matchedIndex = host.metadata.findIndex(singleMetadata => singleMetadata.id === type && singleMetadata.value.match(reg));
            if (matchedIndex < 0) {
                return null;
            }
            let newMetadata = host.metadata.slice();
            newMetadata[matchedIndex] = {
                ...newMetadata[matchedIndex],
                name: <span className="highlight">
                          {newMetadata[matchedIndex].name}
                        </span>,
                value: <span className="highlight">
                          {newMetadata[matchedIndex].value}
                        </span>
            };
            return {
                ...host,
                metadata: newMetadata
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
            if(column.key === 'metadata') {
                return {
                    ...column,
                    filterDropdown: <MetadataFilter metadata={this.props.metadata} filtered={this.state.filtered} onSelect={this.onSelect} onClear={this.onClearSelect} onDismiss={this.onDismiss} />,
                    filterIcon: <Icon onClick={e => !this.state.visible && e.stopPropagation()} type="tag-o" style={{ color: this.state.filtered ? '#84e985' : '#aaa' }} />,
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
