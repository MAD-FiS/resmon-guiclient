import React from 'react';
import { Popconfirm, Divider } from 'antd';

const Edit =({record, text, editable, onSaveRow, onEditRowStart, onEditRowCancel}) => (
    <span className="editable-row-operations">
        {
            editable ?
                <span>
                    <a onClick={() => onSaveRow(record.key)}>Zapisz</a>
                    <Divider type="vertical" />
                    <Popconfirm title="Czy chcesz cofnąć zmiany?" onConfirm={() => onEditRowCancel(record.key)}>
                        <a>Anuluj</a>
                    </Popconfirm>
                </span>
                : <a onClick={() => onEditRowStart(record.key)}>{text}</a>
        }
    </span>
);

export default Edit;
