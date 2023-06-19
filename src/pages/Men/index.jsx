/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Men(props) {
    const [men, setMen] = useState([]);
    useEffect(() => {
        const getMen = async () => {
            let userCollectionRef = collection(db, 'men');
            const data = await getDocs(userCollectionRef);
            setMen(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getMen();
    }, []);
    // const handleCart = (id) => {
    //     localStorage.setItem('idMen', id);
    //     navigate('men/cart/:id');
    // };

    return (
        <div className="grid">
            <div className="row">
                {men.map((men) => (
                    <div className="col c-3" key={men.id}>
                        <Link to={`${men.idmen}`} className="col-link">
                            <img className="col-img" src={men.image} alt="" />
                            <p className="col-title">{men.title}</p>
                            <div className="col-price">${men.price}</div>
                            <FontAwesomeIcon className="col-icon" icon={faCartShopping}>
                                <div className="col-icon-cart">2121</div>
                            </FontAwesomeIcon>
                            <div className="col-icon-cart">
                                Đặt hàng
                                <div className="arrow-down"></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Men;
