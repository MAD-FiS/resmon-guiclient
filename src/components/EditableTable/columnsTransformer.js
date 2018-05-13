import React from 'react';
import EditableCell from './EditableCell';
import Menu from './Menu';

const sorterDecorator = (inputColumn, originalColumn) => {
    inputColumn.sorter = (a, b) => {
        const val1 = a[originalColumn.id].value;
        const val2 = b[originalColumn.id].value;
        if (typeof val1 !== typeof val2) {
            return false;
        }
        switch (typeof val1) {
            case 'number':
                return val1 < val2;
            case 'string':
                return val1.localeCompare(val2);
            default:
                return false;
        }
    };
    return inputColumn;
};

const menuTransformer = (inputColumn, onSaveRow, onEditRowStart, onEditRowCancel, onDeleteRow) => {
    return {
        title: inputColumn.name,
        render: (value, record) => {
            return (
                <Menu menuButtons={inputColumn.buttons} loading={record.__loading} editable={record.__editMode} record={record} onSaveRow={onSaveRow}
                      onEditRowStart={onEditRowStart} onEditRowCancel={onEditRowCancel} onDeleteRow={onDeleteRow}/>
            )},
    };
};

const columnTransformer = (inputColumns, onHandleChange = () => (null), onSaveCell = () => (null), onEditCellStart = () => (null), onEditCellCancel = () => (null), onSaveRow = () => (null), onEditRowStart = () => (null), onEditRowCancel = () => (null), onDeleteRow = () => (null)) => {
    let outputColumns = [], newColumn;
    for (const column of inputColumns) {
        if (column.type === 'menu') {
            newColumn = menuTransformer(column, onSaveRow, onEditRowStart, onEditRowCancel, onDeleteRow);
        } else {
            newColumn = {
                title: column.name,
                dataIndex: column.id,
                render: (value, record) => (
                        <EditableCell editable={column.editable && !record.__editMode} loading={value.__loading || record.__loading} rowId={record.key}
                                      colId={value.__name} onHandleChange={onHandleChange} onSave={onSaveCell}
                                      onEditStart={onEditCellStart} onEditCancel={onEditCellCancel}
                                      value={value.value} editMode={value.__editMode || record.__editMode}
                                      __name={value.__name}
                        />
                    ),
            }
        }
        if (column.sortable === true) {
            newColumn = sorterDecorator(newColumn, column);
        }
        outputColumns.push(newColumn);
    }
    return outputColumns;
};

export default columnTransformer;
