import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './index.scss';
import CustomInput from '../../components/CustomInput/Input';
// import CustomSelect from '../../components/CustomSelect/Select';
import CustomCheckbox from '../../components/CustomCheckbox/Checkbox';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
function Login(props) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [messenger, setMessenger] = useState('');
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
    useEffect(() => {
        const getUsers = async () => {
            let userCollectionRef = collection(db, 'users');
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    const onSubmit = (values) => {
        // eslint-disable-next-line array-callback-return
        users.map((user) => {
            if (user.email === values.email && user.password === values.password) {
                setMessenger('');
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userName', user.name);
                localStorage.setItem('userImage', JSON.stringify(user.image));
                alert('Login Success');
                navigate('/women');
            } else {
                setMessenger('Tài khoản đăng nhập không chính xác, vui lòng đăng nhập lại');
            }
        });

        // console.log('Saved data', JSON.parse(JSON.stringify(values)));
    };

    // console.log(users.name);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            // validateOnChange={false}
        >
            {(formik) => {
                const { values, handleChange } = formik;
                // console.log('Formik data', formik);
                // console.log(formik);
                return (
                    <Form className="form-wrapper">
                        <h2 className="form-title">Login</h2>
                        <div className="form-inner">
                            <CustomInput
                                label="Email: "
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email"
                                value={values.email}
                                onChange={(e) => {
                                    messenger && setMessenger('');
                                    handleChange(e);
                                }}
                            />
                            <CustomInput
                                id="password"
                                label="Password: "
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={(e) => {
                                    messenger && setMessenger('');
                                    handleChange(e);
                                }}
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
                            <CustomCheckbox type="checkbox" name="accepted" id="toggle" />
                            <div className="error-messenger">{messenger}</div>
                        </div>

                        <div className="mgtop-35px">
                            <button className="form-btn" type="submit">
                                Login
                            </button>
                            <Link className="link" to="/register">
                                <p className="link-register">Register</p>
                            </Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default Login;
