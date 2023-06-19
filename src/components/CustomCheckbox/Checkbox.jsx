import { useField } from 'formik';
import React from 'react';

function CustomCheckbox(props) {
    const { label, ...pread } = props;
    const [field, meta] = useField(props);

    return (
        <>
            <div className="distance-20px">
                <label htmlFor="toggle">
                    <input className="checkbox-input" {...field} {...pread}></input>

                    {/* className={meta.touched && meta.error ? 'select-error' : ''} */}
                    {/* {meta.touched && meta.error && <div className="error">{meta.error}</div>} */}
                    <span className="checkbox-title">I accept the terms of service</span>
                </label>
            </div>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : ''}
        </>
    );
}

export default CustomCheckbox;
