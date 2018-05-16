import React from 'react';
import { Button, Input, Icon } from 'antd';

export class Hostname extends React.Component
{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        visible: false,
        searchQuery: '',
        filtered: false,
        dataSource: this.props.dataSource
    });

    inputSearchChange = (searchQuery) => {
        this.setState({
            searchQuery
        });
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.dataSource !== nextProps.dataSource) {
            this.setState({
                dataSource: this.applyFilters(nextProps.dataSource)
            });
            this.onSearch();
        }
    }

    onSearch = () => {
        const { searchQuery } = this.state;
        this.setState({
            filtered: !!searchQuery,
            visible: false,
            dataSource: this.applyFilters(this.props.dataSource)
        });
    };

    applyFilters = (dataSource) => {
        const { searchQuery } = this.state;
        if(searchQuery === '') {
            this.onClearSearch();
            return dataSource;
        }
        const reg = new RegExp(searchQuery, 'gi');
        return dataSource.map((host) => {
            const match = host.hostname.match(reg);
            if (!match) {
                return null;
            }
            return {
                ...host,
                key: host.hostname,
                displayName: (
                    <span>
                          {host.hostname.split(reg).map((text, i) => (
                              i > 0 ? [<span key="1" className="highlight">{match[0]}</span>, text] : text
                          ))}
                        </span>
                ),
            };
        }).filter(host => !!host);
    };

    onClearSearch = () => {
        this.setState(this.getInitialState());
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
            if(column.key === 'hostname') {
                return {
                    ...column,
                    sorter: (a, b) => a.hostname.localeCompare(b.hostname),
                    filterDropdown: (
                        <div className="hostname-filter-search">
                            <Input
                                ref={elem => this.hostnameSearchInput = elem}
                                placeholder="Znajdź host"
                                value={this.state.searchQuery}
                                onChange={(e) => this.inputSearchChange(e.target.value)}
                                onPressEnter={this.onSearch}
                            />
                            <Button type="primary" onClick={this.onSearch}>Szukaj</Button>
                            {
                                this.state.filtered && this.state.searchQuery !== '' ? <Button type="default" onClick={this.onClearSearch}>Wyczyść</Button> : null
                            }
                        </div>
                    ),
                    filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#84e985' : '#aaa' }} />,
                    filterDropdownVisible: this.state.visible,
                    onFilterDropdownVisibleChange: (visible) => {
                        this.setState({
                            visible
                        }, () => {
                            return this.hostnameSearchInput && this.hostnameSearchInput.focus();
                        });
                    }
                };
            }
            return column;
        });
        return <div>{this.renderChildren(columns)}</div>;
    }
}
