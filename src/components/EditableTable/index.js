import React, { Component } from 'react'

import { Table } from 'antd';
import dataTransformer from './dataTransformer';
import columnTransformer from './columnsTransformer';
import ModalAdd from './ModalAdd';

import './index.less';

class EditableTable extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataTransformer.data2model(this.props.dataSource),
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.dataSource !== nextProps.dataSource) {
            const dataSource = dataTransformer.data2model(nextProps.dataSource);
            this.setState({
                dataSource
            });
        }
    }

    setCellDataProp = (rowId, colId, name, value) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex][colId][name] = value;
        this.setState({
            dataSource
        });
    };

    onHandleChange = (rowId, colId, newValue) => {
        this.setCellDataProp(rowId, colId, 'value', newValue);
    };

    onSaveCell = (rowId, colId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex][colId].__editMode = false;
        dataSource[rowIndex][colId].__loading = true;
        this.setState({
            dataSource
        });
        if(typeof this.props.onChangeCell !== 'undefined') {
            this.props.onChangeCell(rowId, colId, this.state.dataSource[rowIndex][colId].value);
        }
    };

    onEditCancel = (rowId, colId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex][colId].value = dataSource[rowIndex][colId].__oldValue;
        dataSource[rowIndex][colId].__editMode = false;
        this.setState({
            dataSource
        });
    };

    onEditStart = (rowId, colId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex][colId].__oldValue = dataSource[rowIndex][colId].value;
        dataSource[rowIndex][colId].__editMode = true;
        this.setState({
            dataSource
        });
    };

    onSaveRow = (rowId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex].__editMode = false;
        dataSource[rowIndex].__loading = true;
        this.setState({
            dataSource
        });
        if(typeof this.props.onChangeRow !== 'undefined') {
            this.props.onChangeRow(rowId, dataTransformer.pureRow(dataSource[rowIndex]));
        }
    };

    onEditRowStart = (rowId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex].__editMode = true;
        for(const colId in dataSource[rowIndex]) {
            if(dataSource[rowIndex].hasOwnProperty(colId) && colId !== '__editMode' && colId !== 'key' && colId !== '__loading') {
                dataSource[rowIndex][colId].__oldValue = dataSource[rowIndex][colId].value;
            }
        }
        this.setState({
            dataSource
        });
    };

    onEditRowCancel = (rowId) => {
        const rowIndex = this._findRowIndex(rowId);
        let dataSource = this.state.dataSource.slice();
        dataSource[rowIndex].__editMode = false;
        for(const colId in dataSource[rowIndex]) {
            if(dataSource[rowIndex].hasOwnProperty(colId) && colId !== '__editMode' && colId !== 'key' && colId !== '__loading') {
                dataSource[rowIndex][colId].value = dataSource[rowIndex][colId].__oldValue;
            }
        }
        this.setState({
            dataSource
        });
    };

    onAddRow = (row) => {
        this.props.onAddRow(row);
    };

    _findRowIndex(rowId) {
        return this.state.dataSource.findIndex((element) => element.key === rowId);
    }

    render() {
        return (
            <div className="editable-table">
                <ModalAdd buttonText="Dodaj monitor" columns={this.props.columns} onAdd={this.onAddRow} />
                <Table size="middle" bordered rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={columnTransformer(this.props.columns, this.onHandleChange, this.onSaveCell, this.onEditStart, this.onEditCancel, this.onSaveRow, this.onEditRowStart, this.onEditRowCancel, this.props.onDeleteRow)} />
            </div>
        );
    }
}

export default EditableTable;
