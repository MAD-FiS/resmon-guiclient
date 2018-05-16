import React from 'react';
import { Popconfirm, Icon } from 'antd';

const RemoveMetric = ({onConfirm}) => (
    <Popconfirm placement="top" title="Czy chcesz usunąć tę metrykę?" onConfirm={onConfirm} onCancel={()=>null} okText="Tak" cancelText="Nie">
        <Icon type="cross" />
    </Popconfirm>
);

export default RemoveMetric;
