import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Header() {
    const image = JSON.parse(localStorage.getItem('userImage'));
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('userName');
    const handleRemoveCookie = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');

        navigate('/');
    };
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <a href="/" className={cx('link')}>
                    DIVISIMA
                </a>
                <div className={cx('search')}>
                    <input className={cx('input')} type="text" placeholder="Search on divisima ..."></input>
                    <span className={cx('search-info')}>
                        <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                    </span>
                </div>

                <div className={cx('signin')}>
                    {isLogin ? (
                        <>
                            <span className={cx('signin-text-name')}>
                                {' '}
                                <img className={cx('login-img')} src={image} alt="" />
                                Hello, {localStorage.getItem('userName')}
                            </span>
                            <button className={cx('logout-btn')} onClick={handleRemoveCookie}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={cx('link-none', 'color-black')}>
                            <FontAwesomeIcon className={cx('account-icon')} icon={faUser}></FontAwesomeIcon>

                            <span className={cx('signin-text')}>Login In or Create Account</span>
                        </Link>
                    )}
                </div>

                <div className={cx('cart')}>
                    <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping}></FontAwesomeIcon>
                    <span className={cx('cart-text')}>Shopping Cart</span>
                </div>
            </div>
        </aside>
    );
}

export default Header;
