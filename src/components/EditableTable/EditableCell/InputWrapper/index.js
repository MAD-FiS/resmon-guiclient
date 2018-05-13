import React from 'react';
import {Input, Icon} from 'antd';

const InputWrapper = ({value, editable, rowId, colId, onHandleChange, onSave, onEditCancel}) => (
    <React.Fragment>
        <Input
            value={value}
            className="text-wrapper-value"
            onChange={(e) => onHandleChange(rowId, colId, e.target.value)}
            onPressEnter={(e) => editable ? onSave(rowId, colId) : null}
        />
        {
            editable ?
                <React.Fragment>
                    <Icon
                        type="check"
                        className="editable-cell-icon-check"
                        onClick={(e) => onSave(rowId, colId)}
                    />
                    <Icon
                        type="close"
                        className="editable-cell-icon-cancel"
                        onClick={(e) => onEditCancel(rowId, colId)}
                    />
                </React.Fragment>
                : ''
        }
    </React.Fragment>
);


export default InputWrapper;
