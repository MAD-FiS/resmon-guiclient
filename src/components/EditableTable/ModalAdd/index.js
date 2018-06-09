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
        this.required = {};
        for (const column of this.props.columns) {
            if (column.type !== 'menu') {
                this.state.row[column.id] = '';
                this.columnNames[column.id] = column.name;
                this.required[column.id] = column.required;
            }
        }
        this.form = null;
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
        if(this.form !== null) {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.props.onAdd(Object.assign({}, this.state.row));
                    this.setState({
                        row: this._getEmptyRow(),
                        visible: false
                    });
                    this.form.setFieldsValue(this._getEmptyRow());
                }
            });
        }
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

    setFormRef = (form) => {
        this.form = form;
    };

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
                    <FormAdd row={this.state.row} columnNames={this.columnNames} required={this.required} onChange={this.onChange} setFormRef={this.setFormRef} />
                </Modal>
            </div>
        );
    }
}

export default ModalAdd;
