import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Advertisement from '../../components/Advertisement';
import { faAngleLeft, faAngleRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const productCollectionRef = collection(db, 'product');

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(productCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Advertisement />
            <div className={cx('inner')}>
                <div className={cx('inner-service')}>
                    <FontAwesomeIcon className={cx('inner-icon')} icon={faCreditCard}></FontAwesomeIcon>
                    <h2 className={cx('inner-title')}>FAST SECURE PAYMENTS</h2>
                </div>
                <div className={cx('inner-service')}>
                    <FontAwesomeIcon className={cx('inner-icon')} icon={faStar}></FontAwesomeIcon>
                    <h2 className={cx('inner-title')}>PREMIUM PRODUCTS</h2>
                </div>
                <div className={cx('inner-service')}>
                    <FontAwesomeIcon className={cx('inner-icon')} icon={faTelegram}></FontAwesomeIcon>
                    <h2 className={cx('inner-title')}>FREE & FAST DELIVERY</h2>
                </div>

                {/* Product */}
            </div>
            <div className={cx('product')}>
                <h2 className={cx('product-title')}>LATEST PRODUCTS</h2>
                <div className={cx('product-image')}>
                    <div className={cx('grid')}>
                        <div className={cx('row')}>
                            {/* <div className={cx('c-3')}> */}
                            {products.map((product) => (
                                <div className={cx('product-list')} key={product.Id}>
                                    <img className={cx('product-picture')} src={product.Picture} alt="" />
                                    <div className={cx('product-info')}>
                                        <p className={cx('product-name')}>{product.Name}</p>
                                        <span className={cx('product-price')}>${product.Price}</span>
                                    </div>
                                    <div className={cx('product-action')}>
                                        <FontAwesomeIcon className={cx('product-icon-cart')} icon={faCartShopping} />
                                        <FontAwesomeIcon className={cx('product-icon-heart')} icon={faHeart} />
                                    </div>
                                </div>
                            ))}
                            {/* </div> */}
                        </div>
                    </div>
                    {/* Button */}
                    <div className={cx('product-btn')}>
                        <button className={cx('product-btn-prev')}>
                            <FontAwesomeIcon className={cx('product-btn-icon')} icon={faAngleLeft} />
                        </button>
                        <button className={cx('product-btn-next')}>
                            <FontAwesomeIcon className={cx('product-btn-icon')} icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
