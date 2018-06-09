import React from 'react';
import { Form, Input } from 'antd';

const FormAdd = ({form, row, columnNames, required, onChange, setFormRef}) => {
    setFormRef(form);
    let inputs = [];
    Object.entries(columnNames).forEach(([columnId, columnName]) => {
        inputs.push(
            <Form.Item label={columnName} key={columnId}>
                {form.getFieldDecorator(columnId, {
                    rules: [{ required: required[columnId], message: `Pole ${columnName} nie może być puste` }],
                })(
                    <Input onChange={(e) => onChange(columnId, e.target.value)} />
                )}
            </Form.Item>
        );
    });
    return (
        <Form layout="vertical">
            {inputs}
        </Form>
    );
};

const WrappedFormAdd = Form.create()(FormAdd);
export default WrappedFormAdd;
