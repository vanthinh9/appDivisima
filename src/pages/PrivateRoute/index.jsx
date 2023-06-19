import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
function PrivateRoute(props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const infoStringify =
        localStorage.getItem('userId') && localStorage.getItem('userImage') && localStorage.getItem('userName');

    // const info = JSON.parse(infoStringify);

    const navigate = useNavigate();
    useEffect(() => {
        !infoStringify && navigate('/login');
    }, [infoStringify, navigate]);

    const objProduct = {
        id: localStorage.getItem('MenId'),
        title: localStorage.getItem('MenTitle'),
        image: localStorage.getItem('MenImage'),
        price: localStorage.getItem('MenPrice'),
        number: localStorage.getItem('MenNumber'),
    };
    console.log('obj', objProduct);

    return (
        <div className="">
            {' '}
            <Outlet />
        </div>
    );
}

export default PrivateRoute;
