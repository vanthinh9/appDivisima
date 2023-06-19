import { useField } from 'formik';
import React from 'react';

function CustomInput(props) {
    const { label, ...pread } = props;
    const [field, meta] = useField(props);

    return (
        <>
            <div className="distance-20px">
                <label className="label">{label}</label>
                <input className="input" {...field} {...pread}></input>
                {/* className={meta.touched && meta.error ? 'input-error' : ''}
            {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
            </div>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : ''}
        </>
    );
}

export default CustomInput;
