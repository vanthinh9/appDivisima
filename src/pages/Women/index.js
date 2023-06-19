// import { useEffect, useState } from 'react';
import './Women.module.scss';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';

import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight, faStreetView, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';

import styles from './Women.module.scss';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from '../../components/cookie/cookie';

// Model

import AddEdit from '../../components/AddEdit/AddEdit';
import Swal from 'sweetalert2';

const cx = className.bind(styles);
function Women() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpen = () => setOpenAdd(true);

    // const [newName, setNewName] = useState('');
    // const [newAge, setNewAge] = useState(0);
    // const [newAddress, setNewAddress] = useState('');

    // const updateUser = async (id, age) => {
    //     const userDoc = doc(db, 'users', id);
    //     const newFields = { age: age + 1 };
    //     await updateDoc(userDoc, newFields);
    // };

    // const deleteUser = async (id) => {
    //     const userDoc = doc(db, 'users', id);
    //     await deleteDoc(userDoc);
    // };
    // const handleCreate = async () => {
    //     await addDoc(userCollectionRef, { name: newName, age: Number(newAge), address: newAddress });
    //     alert('Thanh cong');
    // };
    const getUsers = async () => {
        try {
            const userCollectionRef = collection(db, 'users');
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {}
    };
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    const [valueForm, setValueForm] = useState({
        name: '',
        email: '',
        address: '',
        image: '',
        age: '',
    });

    // const [users, setUsers] = useState([]);
    // const getApiUser = async () => {
    //     await axios
    //         .get('https://jsonplaceholder.typicode.com/users')
    //         .then((res) => {
    //             setUsers(res.data);
    //         })
    //         .catch((error) => [console.log(error)]);
    // };
    // useEffect(() => {
    //     getApiUser();
    // }, []);

    function prePage() {
        if (currentPage !== 1) {
            setcurrentPage(currentPage - 1);
        }
    }

    function changePage(id) {
        setcurrentPage(id);
    }

    function nextPage() {
        if (currentPage !== nPage) {
            setcurrentPage(currentPage + 1);
        }
    }
    const confirmDeleteWonmen = (id) => {
        Swal.fire({
            title: 'Do you want to Delete the changes?',
            showCancelButton: true,
            confirmButtonText: 'DELETE',
            confirmButtonColor: 'red',
            cancelButtonText: 'CANCEL',
            cancelButtonColor: 'blue',
            focusCancel: true,
            allowOutsideClick: false,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handlDelete(id);
            }
        });
    };
    // Delete
    const handlDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            getUsers();

            // const animationSuccess = () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500,
            });
            // };
            // animationSuccess();
        } catch (error) {}
    };

    // Update

    const handleUpdate = (user) => {
        setValueForm(user);
        setOpenEdit(true);
        setCookie('userId', user.id);
    };

    return (
        <div>
            {/* search */}
            <div className={cx('search')}>
                <form>
                    <div className={cx('search-inner')}>
                        <input
                            className={cx('search-contact')}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search contact"
                        ></input>
                        <button className={cx('search-btn')} type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div className={cx('add-inner')}>
                    {/* <NavLink to="/add"> */}
                    <button className={cx('add-btn')} type="submit" onClick={handleOpen}>
                        Add Contact
                    </button>
                    {/* </NavLink> */}
                </div>
                <div>
                    {openAdd && (
                        <AddEdit open={openAdd} setOpen={setOpenAdd} value={valueForm} setValue={setValueForm} />
                    )}
                </div>
            </div>

            <table className={cx('wrapper')}>
                <tbody>
                    {/* {Object.keys(records).map((id, index) => {})} */}
                    <tr className={cx('inner-rows')}>
                        <td style={{ maxWidth: '110px' }}>ID</td>
                        <td style={{ width: '90px' }}>Image</td>
                        <td style={{ width: '160px' }}>Name</td>
                        <td style={{ width: '70px' }}>Age</td>
                        <td style={{ width: '250px' }}>Email</td>
                        <td style={{ width: '170px' }}>Address</td>
                        <td style={{ width: '160px' }}>Action</td>
                    </tr>
                    {records
                        .filter((user) => {
                            return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search);
                        })
                        .map((user, index) => (
                            <tr key={index} className={cx('inner-row')}>
                                <th>{user.id}</th>
                                <th>
                                    <img src={user.image} className={cx('inner-row-img')} alt="" />
                                </th>
                                <th>{user.name}</th>

                                <th>{user.age}</th>

                                <th>{user.email}</th>

                                <th>{user.address}</th>
                                <th>
                                    <Link>
                                        <FontAwesomeIcon
                                            onClick={() => handleUpdate(user)}
                                            icon={faPenToSquare}
                                            className={cx('inner-icon-update')}
                                        >
                                            <button>Edit</button>
                                        </FontAwesomeIcon>
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => confirmDeleteWonmen(user.id)}
                                        className={cx('inner-icon-delete')}
                                    >
                                        <button>Delete</button>
                                    </FontAwesomeIcon>

                                    <FontAwesomeIcon icon={faStreetView} className={cx('inner-icon-view')}>
                                        <button>View</button>
                                    </FontAwesomeIcon>
                                </th>
                            </tr>
                        ))}
                </tbody>
            </table>
            <nav className={cx('page')}>
                <div>
                    <ul className={cx('page-list')}>
                        <li className={cx('page-item')}>
                            <a
                                href="#*"
                                onClick={prePage}
                                className={cx('page-btn', currentPage === 1 ? 'disable' : '')}
                            >
                                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                            </a>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={cx('page-item', currentPage === n ? 'active' : '')} key={i}>
                                <a href="#*" onClick={() => changePage(n)} className={cx('page-btn')}>
                                    {n}
                                </a>
                            </li>
                        ))}

                        <li className={cx('page-item')}>
                            <a
                                href="#*"
                                onClick={nextPage}
                                className={cx('page-btn', currentPage === nPage ? 'disable' : '')}
                            >
                                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <ToastContainer />
            {openEdit && (
                <AddEdit title="Edit" open={openEdit} setOpen={setOpenEdit} value={valueForm} setValue={setValueForm} />
            )}
        </div>
    );
}

export default Women;
