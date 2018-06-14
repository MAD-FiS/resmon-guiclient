import React from 'react';
import EditableTable from '../index';
import {fakeColumns, fakeData} from './fakeData';

class TableContainer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: fakeData
        };
    }

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
            <EditableTable dataSource={this.state.dataSource} columns={fakeColumns} onChangeRow={this.changeRow} onChangeCell={this.changeCell} onAddRow={this.addRow} onDeleteRow={this.deleteRow} />
        );
    }
}

export default TableContainer;
