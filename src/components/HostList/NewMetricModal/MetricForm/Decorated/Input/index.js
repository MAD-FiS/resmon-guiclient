import React from 'react';
import { Icon, Tooltip } from 'antd';

export class Input extends React.PureComponent {
    render() {
        const {id, value, placeholder, disabled, help, icon, onClear, onChange, children} = this.props;
        let input = null;
        return React.Children.map(children, (child) => (
            React.cloneElement(child, {
                placeholder,
                disabled,
                value,
                prefix: typeof icon !== 'undefined' ? <Icon type={icon} style={{color: 'rgba(0,0,0,.25)'}}/> : null,
                suffix: value && !disabled ? <Icon type="close-circle" onClick={() => {
                    onClear(id);
                    input.focus();
                }}/> : null,
                onChange: !disabled ? (e) => onChange(id, typeof e === 'object' ? e.target.value : e) : () => null,
                ref: node => input = node,
                addonAfter: help ? <Tooltip title={help}><Icon type="question-circle-o"/></Tooltip> : ''
            })
        ));
    }
}
