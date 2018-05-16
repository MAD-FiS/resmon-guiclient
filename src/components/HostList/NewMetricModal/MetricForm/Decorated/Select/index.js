import React from 'react';
import { Select as OriginalSelect } from 'antd';

export const Select = ({id, searchable, disabled, options, onChange, ...props}) => (
    <OriginalSelect
        {...props}
        showSearch={searchable}
        disabled={disabled}
        onChange={!disabled ? (v) => onChange(id, v) : () => null}
    >
        {
            options.map(option => {
                return <OriginalSelect.Option key={option.value} value={option.value}>{option.name}</OriginalSelect.Option>
            })
        }
    </OriginalSelect>
);
