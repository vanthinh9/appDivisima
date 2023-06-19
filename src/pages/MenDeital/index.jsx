import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import './index.scss';
import { CartContext } from '../../App';
function MenDetail(props) {
    const { idProductMen } = useParams();
    const [loading, setLoading] = useState(false);
    const [men, setMen] = useState();
    const [number, setNumber] = useState(1);
    const { setProductInCart } = useContext(CartContext);
    useEffect(() => {
        const getMen = async () => {
            setLoading(true);
            try {
                let userCollectionRef = collection(db, 'men');
                const data = await getDocs(userCollectionRef);

                const listProductMen = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                const menDetails = listProductMen.find(({ idmen }) => idmen === +idProductMen);
                setMen(menDetails);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        getMen();
    }, [idProductMen]);
    const handleIncreNumber = () => {
        setNumber(number + 1);
    };
    const handleDecreNumber = () => {
        if (number === 1) {
            setNumber(number);
        } else {
            setNumber(number - 1);
        }
    };
    const navigate = useNavigate();
    const handleOrderDetails = () => {
        localStorage.setItem('MenId', men.idmen);
        localStorage.setItem('MenTitle', men.title);
        localStorage.setItem('MenImage', men.image);
        localStorage.setItem('MenPrice', men.price);
        localStorage.setItem('MenNumber', number);
        setProductInCart((prev) => {
            const productExits = prev.find((item) => item.idmen === men.idmen);
            if (!productExits) {
                return [...prev, { ...men, qty: number }];
            } else {
                const productIndex = prev.findIndex((item) => item.idmen === men.idmen);
                const oldCart = [...prev];
                const { qty: oldQty } = productExits;
                oldCart.splice(productIndex, 1, { ...men, qty: oldQty + number });

                return oldCart;
            }
        });
        navigate('/payment');
    };
    return (
        <div>
            {loading ? (
                'Loangding'
            ) : men ? (
                <div className="men">
                    <div className="men-wrapper">
                        <div className="men-img">
                            <img className="men-img-size" src={men.image} alt="" />
                            <div className="men-img-share">
                                <p>Chia sẻ:</p>
                                <FontAwesomeIcon icon={faFacebookMessenger} />
                                <FontAwesomeIcon icon={faFacebook} />
                            </div>
                        </div>
                        <div className="men-info">
                            <p className="men-info-title">{men.title}</p>
                            <div className="men-info-evaluate">
                                <a className="men-info-link" href="#*">
                                    Đánh Giá
                                </a>
                                <p className="men-info-border"></p>
                                <a className="men-info-link" href="#*">
                                    Đã Bán
                                </a>
                            </div>
                            <div>
                                <div className="men-info-size">
                                    <p>Size</p>
                                    <button>M</button>
                                    <button>L</button>
                                    <button>XL</button>
                                </div>
                                <div className="men-info-number">
                                    <p>Number</p>

                                    <button className={number === 1 ? 'disabled' : ''} onClick={handleDecreNumber}>
                                        -
                                    </button>
                                    <h5>{number}</h5>
                                    <button onClick={handleIncreNumber}>+</button>
                                </div>
                                <div className="men-info-price">
                                    <p>Price</p>
                                    <h4>${men.price}</h4>
                                </div>
                            </div>
                            <div className="men-info-mgtop70px">
                                <div className="men-info-evaluate">
                                    <div className="men-info-order">
                                        <FontAwesomeIcon className="men-info-icon-cart" icon={faCartShopping} />
                                        <a href="/cart" className="men-info-btn-cart">
                                            Add To Cart
                                        </a>
                                    </div>
                                    <button onClick={handleOrderDetails} className="men-info-btn-buy">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                'No products found'
            )}
        </div>
    );
}

export default MenDetail;
