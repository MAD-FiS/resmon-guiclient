import React, { Component } from 'react'
import FormAdd from './FormAdd';
import { Button, Modal } from 'antd';

class ModalAdd extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            row: {},
            visible: false
        };
        this.columnNames = {};
        for (const column of this.props.columns) {
            if (column.type !== 'menu') {
                this.state.row[column.id] = '';
                this.columnNames[column.id] = column.name;
            }
        }
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    hideModal = () => {
        this.setState({
            visible: false
        });
    };

    addRow = () => {
        this.props.onAdd(Object.assign({}, this.state.row));
        this.setState({
            row: this._getEmptyRow(),
            visible: false
        });
    };

    onChange = (columnId, value) => {
        let row = Object.assign({}, this.state.row);
        row[columnId] = value;
        this.setState({
            row
        });
    };

    _getEmptyRow() {
        let newRow = {};
        Object.entries(this.state.row).forEach(([columnId]) => newRow[columnId] = '');
        return newRow;
    }

    render() {
        return (
            <div className="form-add">
                <Button className="editable-add-btn" onClick={this.showModal}>{this.props.buttonText}</Button>
                <Modal
                    title="Dodaj nowy"
                    visible={this.state.visible}
                    onOk={this.addRow}
                    onCancel={this.hideModal}
                    okText="Dodaj"
                    cancelText="Anuluj"
                >
                    <FormAdd row={this.state.row} columnNames={this.columnNames} onChange={this.onChange}/>
                </Modal>
            </div>
        );
    }
}

export default ModalAdd;
