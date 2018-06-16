import React from 'react';
import { Icon, Popconfirm } from 'antd';

const ChartDeleteButton = ({ onDelete }) => (
    <Popconfirm title="Na pewno chcesz usunąć ten wykres?" onConfirm={onDelete} okText="Usuń" cancelText="Anuluj">
        <a className="chart-delete-button">
            <Icon type="delete" />
        </a>
    </Popconfirm>
);

export default ChartDeleteButton;
