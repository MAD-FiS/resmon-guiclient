import React from 'react';
import { Icon } from 'antd';
import EditableTable from '../EditableTable';
import strToColor from '../../utils/strToColor';
import './index.less';

const columns = [
    {
        name: "Adres",
        id: "address",
        editable: true,
        sortable: true,
        width: '30%',
        required: true,
        prefixRender: (field) => <Icon className="monitor-icon" type="database" style={{ color: strToColor(field.value) }} />
    },
    {
        name: "Opis",
        id: "description",
        editable: true,
        sortable: true,
        required: true,
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
