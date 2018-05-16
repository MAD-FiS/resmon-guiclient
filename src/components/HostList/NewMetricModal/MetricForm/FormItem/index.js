import React from 'react';
import { Form } from 'antd';

const FormItem = ({ label, children }) => (
    <Form.Item label={label}>
        {React.Children.map(children, (child) => (
            React.cloneElement(child, { placeholder: label })
        ))}
    </Form.Item>
);

export default FormItem;
