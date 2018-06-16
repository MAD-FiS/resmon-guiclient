import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';

const FormItem = Form.Item;

const LoginForm = ({ form, indeterminate, signIn }) => (
    <Form onSubmit={e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                signIn(values);
            }
        });
    }} className={`login-form ${indeterminate ? 'indeterminate' : ''}`}>
        <FormItem>
            {form.getFieldDecorator('username', {
                rules: [{ required: true, message: 'Nazwa użytkownika musi zostać podana' }],
            })(
                <Input prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                } placeholder="Nazwa użytkownika" />
            )}
        </FormItem>
        <FormItem>
            {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Hasło musi zostać podane' }],
            })(
                <Input prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                } type="password" placeholder="Hasło" />
            )}
        </FormItem>
        <FormItem>
            {form.getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>Zapamiętaj mnie</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
                Zaloguj się
            </Button>
        </FormItem>
    </Form>
);

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
