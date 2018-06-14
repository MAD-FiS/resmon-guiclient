import React from 'react';

import InputWrapper from './InputWrapper';
import TextWrapper from './TextWrapper';

const EditableCell = ({prefix, editMode, loading, value, editable, rowId, colId, onHandleChange, onSave, onEditStart, onEditCancel}) => (
    <div className={`editable-cell ${loading ? 'loading' : ''}`}>
        {prefix}
        {
            editMode ?
                <InputWrapper value={value} editable={editable} rowId={rowId} colId={colId} onHandleChange={onHandleChange} onSave={onSave} onEditCancel={onEditCancel}/>
                :
                <TextWrapper value={value} editable={editable} rowId={rowId} colId={colId} onEditStart={onEditStart} />
        }
    </div>
);

EditableCell.defaultProps = {
    value: '',
    editable: false,
    __editMode: false
};

export default EditableCell;
