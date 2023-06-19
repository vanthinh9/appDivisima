import React, { useContext, useEffect, useMemo } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../App';
import Swal from 'sweetalert2';
function Payment(props) {
    const { productInCart, setProductInCart } = useContext(CartContext);

    const total = useMemo(() => {
        return productInCart.reduce((result, current) => {
            return result + (+current.price * current.qty || 0);
        }, 0);
    }, [productInCart]);
    useEffect(() => {});

    const confirmDeleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            focusConfirm: false,
            focusCancel: true,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                HandleDeletelocal(id);
            }
        });
    };

    const objProduct = {
        id: localStorage.getItem('MenId'),
        title: localStorage.getItem('MenTitle'),
        image: localStorage.getItem('MenImage'),
        price: localStorage.getItem('MenPrice'),
        number: localStorage.getItem('MenNumber'),
    };

    const navigate = useNavigate();
    const backMen = () => {
        navigate('/men');
    };

    const HandleDeletelocal = (id) => {
        setProductInCart((prev) => {
            const newCart = prev.filter((item) => item.idmen !== id);
            return newCart;
        });

        const animationSuccess = () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500,
            });
        };

        animationSuccess();
    };
    // const { testProduct } = React.useContext(AppContext);

    return (
        <div className="Payment-w1175px">
            <button onClick={backMen} className="Payment-btn-back" type="submit">
                <FontAwesomeIcon className="paymen-btn-icon" icon={faBackward} />
                Back to order
            </button>
            <table className="Payment-table">
                <thead>
                    <tr className="Payment-table-rows">
                        <th style={{ width: '100px' }}>Id</th>
                        <th style={{ width: '100px' }}>Image</th>
                        <th style={{ width: '600px' }}>Product</th>
                        <th style={{ width: '100px' }}>Price</th>
                        <th style={{ width: '100px' }}>Number</th>
                        <th style={{ width: '100px' }}>Total Amount</th>
                        <th style={{ width: '100px' }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {productInCart.length === 0 ? (
                        <tr>
                            <td colSpan={7}>No products found</td>
                        </tr>
                    ) : (
                        productInCart.map((item, index) => {
                            const { idmen, image, title, price, qty } = item;

                            return (
                                <tr className="Payment-table-row" key={idmen}>
                                    <td>{idmen}</td>
                                    <td>
                                        <img className="Payment-row-img" src={image} alt="" />
                                    </td>
                                    <td>{title}</td>
                                    <td>${price}</td>
                                    <td>{qty}</td>
                                    <td>${+price * qty} </td>
                                    <td>
                                        <FontAwesomeIcon
                                            onClick={() => confirmDeleteProduct(idmen)}
                                            className="Payment-row-delete"
                                            icon={faTrash}
                                        ></FontAwesomeIcon>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    <tr>
                        <td className="Payment-table-row-total" colSpan={7}>
                            Total payment: ${total}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="Payment-btn">
                <p className="Payment-total">Total payment: ${total}</p>
                <button className="Payment-btn-confirm" type="submit">
                    <FontAwesomeIcon className="paymen-btn-icon" icon={faSquareCheck} />
                    Payment confirmation
                </button>
            </div>
        </div>
    );
}

export default Payment;
