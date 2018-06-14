import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './index.less';

const FormItem = Form.Item;

const RegisterForm = ({ form, indeterminate, signUp }) => (
    <Form onSubmit={e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { password2, ...credentials } = values; // eslint-disable-line no-unused-vars
                signUp(credentials);
            }
        });
    }} className={`login-form ${indeterminate ? 'indeterminate' : ''}`}>
        <FormItem>
            {form.getFieldDecorator('username', {
                rules: [{ required: true, message: 'Nazwa użytkownika musi zostać podana' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nazwa użytkownika" />
            )}
        </FormItem>
        <FormItem>
            {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Hasło musi zostać podane' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Hasło" />
            )}
        </FormItem>
        <FormItem>
            {form.getFieldDecorator('password2', {
                rules: [{ validator: (rule, password2, callback) => {
                    const password = form.getFieldValue('password');
                    if (password2 && password === password2) {
                        callback();
                    }
                    else {
                        callback(true);
                    }
                }, message: 'Hasła muszą być identyczne' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Powtórz hasło" />
            )}
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
                Zarejestruj się
            </Button>
        </FormItem>
    </Form>
);

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;