import React from 'react';
import EditableTable from '../EditableTable';

const columns = [
    {
        name: "Adres",
        id: "address",
        editable: true,
        sortable: true,
        width: '30%',
    },
    {
        name: "Opis",
        id: "description",
        editable: true,
        sortable: true,
        width: '50%',
    },
    {
        name: "Menu",
        type: "menu",
        buttons: [
            {
                name: "Edytuj",
                type: "edit",
            },
            {
                name: "Usuń",
                type: "delete",
            },
        ]
    }
];

const MonitorsTable = ({ changeMonitorAddress, changeMonitorDescription, changeMonitor, addMonitor, removeMonitor, ...props }) => (
    <EditableTable
        columns={columns}
        onChangeCell={(rowId, colId, value) => {
            const address = props.dataSource[rowId].address;
            if (colId === 'address') {
                changeMonitorAddress(address, value);
            }
            else if (colId === 'description') {
                changeMonitorDescription(address, value);
            }
        }}
        onChangeRow={(rowId, rowData) => {
            const address = props.dataSource[rowId].address;
            changeMonitor(address, rowData);
        }}
        onAddRow={addMonitor}
        onDeleteRow={(rowId) => {
            const address = props.dataSource[rowId].address;
            removeMonitor(address);
        }}
        {...props}
    />
);

export default MonitorsTable;
