import React from 'react';
import EditableTable from '../EditableTable';
import MonitorIcon from '../MonitorIcon';
import './index.less';

const columns = [
    {
        name: 'Adres',
        id: 'address',
        editable: true,
        sortable: true,
        width: '30%',
        required: true,
        prefixRender: field => <MonitorIcon>{field.value}</MonitorIcon> // eslint-disable-line react/display-name
    },
    {
        name: 'Opis',
        id: 'description',
        editable: true,
        sortable: true,
        required: true,
        width: '50%',
    },
    {
        name: 'Menu',
        type: 'menu',
        buttons: [
            {
                name: 'Edytuj',
                type: 'edit',
            },
            {
                name: 'Usuń',
                type: 'delete',
            },
        ]
    }
];

const MonitorsTable = ({ changeMonitorAddress, changeMonitorDescription, addMonitor, removeMonitor, ...props }) => (
    <EditableTable
        className="monitors-table"
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
            changeMonitorDescription(address, rowData.description);
            changeMonitorAddress(address, rowData.address);
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
