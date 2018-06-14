import React from 'react';

import { Form, Input, InputNumber } from 'antd';
import FormItem from './FormItem';
import { Input as DecoratedInput } from './Decorated/Input';
import { Select as DecoratedSelect } from './Decorated/Select';

const { TextArea } = Input;

const MetricForm = ({form, host, metrics, onChange, onClear, setFormRef}) => {
    setFormRef(form);
    if(host !== null) {
        return(
            <Form className="metric-add-form">
                <FormItem label="Nazwa hosta">
                    <DecoratedInput id="hostname" disabled={true} icon="desktop" value={host.hostname} help="Adres hosta">
                        <Input />
                    </DecoratedInput>
                </FormItem>
                <FormItem label="Metryka bazowa">
                    {form.getFieldDecorator('parent_id', {
                        rules: [{ required: true, message: 'Metryka bazowa musi zostać wybrana' }],
                    })(
                        <DecoratedSelect id="parent_id" icon="bulb" help="Bazowa metryka dla obecnie tworzonej" options={metrics} onChange={onChange} onClear={onClear} />
                    )}
                </FormItem>
                <FormItem label="Opis metryki">
                    {form.getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Proszę podać opis metryki' }],
                    })(
                        <TextArea id="description" onChange={(e) => onChange('description', e.target.value)} />
                    )}
                </FormItem>
                <FormItem label="Szerokość okna czasowego">
                    {form.getFieldDecorator('moving_window_duration', {
                        rules: [{ required: true, message: 'Proszę podać szerokość okna czasowego' }],
                    })(
                        <InputNumber id="moving_window_duration" help="Szerokość okna czasowego" onChange={onChange} onClear={onClear} min={1} />
                    )}
                </FormItem>
                <FormItem label="Częstotliwość">
                    {form.getFieldDecorator('interval', {
                        rules: [{ required: true, message: 'Proszę podać częstotliwość' }],
                    })(
                        <InputNumber id="interval" help="Częstotliwość" onChange={onChange} onClear={onClear} min={1} />
                    )}
                </FormItem>
            </Form>
        );
    } else {
        return null;
    }
};

const WrappedMetricForm = Form.create()(MetricForm);
export default WrappedMetricForm;
