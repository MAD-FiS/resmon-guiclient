import React from 'react';

import { Form, Input, InputNumber } from 'antd';
import FormItem from './FormItem';
import { Input as DecoratedInput } from './Decorated/Input';
import { Select as DecoratedSelect } from './Decorated/Select';

const { TextArea } = Input;

const MetricForm = ({host, metrics, onChange, onClear, newMetric}) => {
    const {description, parent_id, moving_window_duration, interval} = newMetric;
    if(host !== null) {
        return(
            <Form className="metric-add-form">
                <FormItem label="Nazwa hosta">
                    <DecoratedInput id="hostname" disabled={true} icon="desktop" value={host.hostname} help="Adres hosta">
                        <Input />
                    </DecoratedInput>
                </FormItem>
                <FormItem label="Metryka bazowa">
                    <DecoratedSelect id="parent_id" icon="bulb" value={parent_id} help="Bazowa metryka dla obecnie tworzonej" options={metrics} onChange={onChange} onClear={onClear} />
                </FormItem>
                <FormItem label="Opis metryki">
                    <TextArea id="description" value={description} onChange={(e) => onChange('description', e.target.value)} />
                </FormItem>
                <FormItem label="Szerokość okna czasowego">
                    <DecoratedInput id="moving_window_duration" icon="bulb" value={moving_window_duration} help="Jednostka wyświetlanych pomiarów" onChange={onChange} onClear={onClear}>
                        <InputNumber min={1} />
                    </DecoratedInput>
                </FormItem>
                <FormItem label="Częstotliwość">
                    <DecoratedInput id="interval" icon="bulb" value={interval} help="Jednostka wyświetlanych pomiarów" onChange={onChange} onClear={onClear}>
                        <InputNumber min={1} />
                    </DecoratedInput>
                </FormItem>
            </Form>
        );
    } else {
        return null;
    }
};

export default MetricForm;
