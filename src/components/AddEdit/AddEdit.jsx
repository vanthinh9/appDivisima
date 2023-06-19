import './styles.scss';

import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../firebase-config';

import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { getCookie } from '../cookie/cookie';

function AddEdit({ title = 'Add', open, setOpen, value, setValue }) {
    // const [open, setOpen] = useState(false)
    // const [data, setDate] = useState({});
    const { image, name, age, email, address } = value || {};
    // Cookiee
    const userId = getCookie('userId');

    const handleInputChange = (e) => {
        const { name, value: valueChange } = e.target;
        setValue({ ...value, [name]: valueChange });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('You wanted to save that contact?')) {
            if (!name || !email || !address || !age || !image) {
                toast.error('Please provide value in each input field', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                if (title === 'Add') {
                    const usersCollectionRef = collection(db, 'users');
                    addDoc(usersCollectionRef, value);
                    toast.success('Contact Added Successfully');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    const usersdocRef = doc(db, 'users', userId);
                    updateDoc(usersdocRef, { image: image, name: name, age: age, email: email, address: address });
                    toast.success('Contact Updated Successfully');

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        }
    };
    // useEffect(() => {
    //     if (open) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'auto';
    //     }
    // }, [open]);
    const handleClose = () => {
        setOpen(false);
        setValue({ image: '', name: '', age: '', email: '', address: '' });
    };
    return (
        <div className="add-edit ">
            <form onSubmit={handleSubmit} className="add-form">
                <h2 className="add-title">{title} Contact</h2>
                <FontAwesomeIcon
                    className="icon-xmark"
                    icon={faCircleXmark}
                    onClick={() => handleClose()}
                ></FontAwesomeIcon>
                <div className="add-inner">
                    <label className="add-label" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="add-input"
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Your Image..."
                        value={image || ''}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="add-inner">
                    <label className="add-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="add-input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name..."
                        value={name || ''}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="add-inner">
                    <label className="add-label" htmlFor="age">
                        Age
                    </label>
                    <input
                        className="add-input"
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Your Age..."
                        value={age || ''}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="add-inner">
                    <label htmlFor="name" className="add-label">
                        Email
                    </label>
                    <input
                        className="add-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Your Email..."
                        value={email || ''}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="add-inner">
                    <label htmlFor="name" className="add-label">
                        Address
                    </label>
                    <input
                        className="add-input"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Your Address..."
                        value={address || ''}
                        onChange={handleInputChange}
                    ></input>
                </div>

                <input type="submit" className="add-btn" value={title === 'Edit' ? 'Update' : 'Save'} />
            </form>

            <ToastContainer />
        </div>
    );
}

export default AddEdit;
