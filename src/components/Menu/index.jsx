import { NavLink } from 'react-router-dom';
import './index.scss';

// const arrayImages = [
//     'https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642__340.jpg',
//     'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366__340.jpg',
//     'https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507__340.jpg',
// ];
// let index = 1;
// const handleImages = () => {
//     console.log(document.getElementsByClassName('list-image'));
//     console.log(arrayImages[index]);
//     document.getElementsByClassName('list-image').src = arrayImages[index];
//     index++;
//     if (index > 2) {
//         index = 0;
//     }
// };
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         console.log(entry);
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//         } else {
//             entry.target.classList.remove('show');
//         }
//     });
// });

// const titleElements = document.getElementsByClassName('title-qc');
// console.log(titleElements);

function Menu() {
    return (
        <div className="wrapper">
            <nav className="nav">
                <div className="inner">
                    <ul className="list">
                        <NavLink className="home" to="/">
                            <li className="item">Home</li>
                        </NavLink>

                        <NavLink to="/women">
                            <li className="item">Product</li>
                        </NavLink>
                        <NavLink to="/men">
                            <li className="item">Men</li>
                        </NavLink>

                        <li className="item">Jewelry</li>
                        <li className="item">Shoes</li>
                        <li className="item">Pages</li>
                        <li className="item">Blog</li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Menu;
