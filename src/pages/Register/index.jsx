import { Formik, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import './index.scss';

// import { addDoc, collection } from 'firebase/firestore';

import CustomInput from '../../components/CustomInput/Input';
// import CustomSelect from '../../components/CustomSelect/Select';
import CustomCheckbox from '../../components/CustomCheckbox/Checkbox';

import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
function Register(props) {
    // const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        // option: '',
        accepted: false,
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'password short').required('Required'),
        // option: Yup.string().oneOf(['1', '2', '3', '4'], 'Choose option').required('Required'),
        accepted: Yup.boolean().oneOf([true], 'Please accept the terms of service').required('Required'),
    });
    const onSubmit = (values) => {
        // console.log('Saved data', JSON.parse(JSON.stringify(values)));
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formik) => {
                // console.log('Formik data', formik);
                return (
                    <Form className="form-wrapper-r">
                        <h2 className="form-title">Register</h2>
                        <div className="form-inner">
                            <CustomInput
                                label="Email: "
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email"
                                // value={formik.values.email}
                                // onChange={formik.handleChange}
                            />
                            <CustomInput
                                id="password"
                                label="Password: "
                                name="password"
                                type="password"
                                placeholder="Password"
                                // value={formik.values.password}
                                // onChange={formik.handleChange}
                            />
                            {/* <CustomSelect
                                label="Select options: "
                                name="option"
                                type="select"
                                placeholder="Choose options select"
                            >
                                <option value="Choose options select">Choose options select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </CustomSelect> */}
                            <CustomCheckbox type="checkbox" name="accepted" />
                        </div>
                        <button className="form-btn" type="submit">
                            Register
                        </button>
                        <Link className="link" to="/login">
                            <p className="link-login">Login</p>
                        </Link>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Register;
