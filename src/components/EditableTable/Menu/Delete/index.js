import React from 'react';
import { Popconfirm } from 'antd';

const Delete = ({record, text, onDeleteRow}) => (
    <Popconfirm title="Czy chcesz usunąć?" onConfirm={() => onDeleteRow(record.key)}>
        <a onClick={e => e.preventDefault()}>{text}</a>
    </Popconfirm>
);

export default Delete;
