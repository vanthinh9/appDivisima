import classNames from 'classnames/bind';
import styles from './Advertisement.module.scss';

import './Advertisement.module.scss';
import { useEffect, useState } from 'react';
// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
const cx = classNames.bind(styles);

function Advertisement() {
    const [phrase, setPhrase] = useState('');
    const phraseChange = () => {
        let contactPhrase = [
            'New Arrivals',
            'Denim Jackets',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
        ];
        for (let i = 0; i < contactPhrase.length; i++) {
            setTimeout(() => {
                setPhrase(contactPhrase[i]);
            }, 1000);
        }
    };
    useEffect(() => {
        phraseChange();
    }, [phrase]);

    useEffect(() => {
        AOS.init();
    });
    return (
        <div className={cx('images')}>
            <img
                alt=""
                src="https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507__340.jpg"
                className={cx('list-image')}
            />
            <div className={cx('title-qc')}>
                <span className={cx('title-span')} data-aos="fade-up" data-aos-duration="500">
                    New Arrivals
                </span>
                <h2 className={cx('title-h2')} data-aos="fade-up" data-aos-duration="2000">
                    Denim Jackets
                </h2>
                <p className={cx('title-messenger')} data-aos="fade-up" data-aos-duration="2000">
                    {phrase}
                </p>
                <div className={cx('title-btn')}>
                    <a href="/" className={cx('title-btn-transpanrent')}>
                        DISCOVER
                    </a>
                    <a href="/" className={cx('title-btn-while')}>
                        ADD TO CART
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Advertisement;
