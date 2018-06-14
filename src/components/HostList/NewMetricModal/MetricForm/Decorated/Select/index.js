import React from 'react';
import { Select as OriginalSelect } from 'antd';

export class Select extends React.PureComponent {
    render() {
        const {id, searchable, disabled, options, onChange, value, myValue, ...rest} = this.props; // eslint-disable-line no-unused-vars
        return (
            <OriginalSelect
                {...rest}
                value={myValue || undefined}
                showSearch={searchable}
                disabled={disabled}
                onChange={!disabled ? (v) => onChange(id, v) : () => null}
            >
                {
                    options.map(option => {
                        return <OriginalSelect.Option key={option.value} value={option.value}>{option.name}</OriginalSelect.Option>;
                    })
                }
            </OriginalSelect>
        );
    }
}
