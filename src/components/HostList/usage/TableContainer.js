import React from 'react';
import HostList from '../index';
import {fakeData} from "./fakeData";

class TableContainer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: fakeData
        };
    }

    addMetric = (hostname, metric) => {
        const dataSource = this.state.dataSource.slice().map(data => {
            if(data.hostname === hostname) {
                metric.id = Math.floor(Math.random()*1000)
                data.metrics.push(metric);
            }
            return data;
        });
        setTimeout(() => {
            console.log(dataSource);
            this.setState({
                dataSource
            });
        }, 3000);
    };

    removeMetric = (hostname, metric_id) => {
        console.log(hostname, metric_id);
        const dataSource = this.state.dataSource.slice().map(data => {
            if(data.hostname === hostname) {
                const foundIndex = data.metrics.findIndex(metric => metric.id === metric_id);
                if(foundIndex >= 0) {
                    data.metrics.splice(foundIndex, 1);
                }
            }
            return data;
        });
        setTimeout(() => {
            console.log(dataSource);
            this.setState({
                dataSource
            });
        }, 3000);
    };

    changeCell = (rowId, colId, value) => {
        let dataSource = this.state.dataSource.slice();
        dataSource[rowId][colId] = value;
        setTimeout(() => {
            this.setState({
                dataSource
            });
        }, 3000);
    };

    changeRow = (rowId, newColumn) => {
        let dataSource = this.state.dataSource.slice();
        dataSource[rowId] = newColumn;
        setTimeout(() => {
            this.setState({
                dataSource
            });
        }, 3000);
    };

    addRow = (row) => {
        let dataSource = this.state.dataSource.slice();
        dataSource.push(row);
        this.setState({
            dataSource
        });
    };

    deleteRow = (rowId) => {
        let dataSource = this.state.dataSource.slice();
        dataSource.splice(rowId, 1);
        this.setState({
            dataSource
        });
    };

    render() {
        return (
            <HostList hosts={fakeData} onAddMetric={this.addMetric} onRemoveMetric={this.removeMetric}/>
        )
    }
}

export default TableContainer;
