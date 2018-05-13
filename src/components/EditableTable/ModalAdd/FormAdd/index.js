import React from 'react';
import { Form, Input } from 'antd';

const FormAdd = ({row, columnNames, onChange}) => {
    let inputs = [];
    Object.entries(columnNames).forEach(([columnId, columnName]) => {
        inputs.push(
            <Form.Item label={columnName} key={columnId}>
                <Input value={row[columnId]} onChange={(e) => onChange(columnId, e.target.value)} />
            </Form.Item>
        );
    });
    return (
        <Form layout="vertical">
            {inputs}
        </Form>
    );
};

export default FormAdd;
