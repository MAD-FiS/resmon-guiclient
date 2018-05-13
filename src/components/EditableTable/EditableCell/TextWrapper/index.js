import React from 'react';
import { Icon } from 'antd';

const TextWrapper = ({value, editable, rowId, colId, onEditStart}) => (
    <React.Fragment>
        {value ? <div className="text-wrapper-value">{value}</div> : null}
        {
            editable ?
                <Icon
                    type="edit"
                    className="editable-cell-icon"
                    onClick={(e) => onEditStart(rowId, colId)}
                /> : ''
        }
    </React.Fragment>
);

export default TextWrapper;
