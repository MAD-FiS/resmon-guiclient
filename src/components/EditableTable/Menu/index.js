import React from 'react';
import { Divider } from 'antd';
import Edit from './Edit';
import Delete from './Delete';

const Menu = ({loading, menuButtons, record, editable, onSaveRow, onEditRowStart, onEditRowCancel, onDeleteRow}) => {
    let key = 0;
    const buttonsArray = menuButtons.map((button, i) => {
        switch (button.type) {
            case 'edit':
                return (
                    <React.Fragment key={++key}>
                        {i ? <Divider type="vertical" /> : null}
                        <Edit
                            record={record} text={button.name} editable={editable} onSaveRow={onSaveRow}
                            onEditRowStart={onEditRowStart} onEditRowCancel={onEditRowCancel}
                        />
                    </React.Fragment>
                );
            case 'delete':
                return (
                    <React.Fragment key={++key}>
                        {i ? <Divider type="vertical" /> : null}
                        <Delete record={record} text={button.name} onDeleteRow={onDeleteRow} />
                    </React.Fragment>
                );
            default:
                return null;
        }
    });
    return (
        <div className={`editable-menu-cell ${loading ? 'loading' : ''}`}>
            {buttonsArray}
        </div>
    );
};

export default Menu;
