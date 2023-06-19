import { useField } from 'formik';
import React from 'react';

function CustomSelect(props) {
    const { label, ...pread } = props;
    const [field, meta] = useField(props);

    return (
        <>
            <div className="distance-20px">
                <label className="label">{label}</label>
                <select className="input" {...field} {...pread}></select>
            </div>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : ''}
        </>
    );
}

export default CustomSelect;
