import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { privateRoutes, publicRoutes } from './routes/index';
import DefaultLayout from './DefaultLayout';
import PrivateRoute from './pages/PrivateRoute';
import { createContext, useEffect } from 'react';
import { useState } from 'react';

// import { useEffect, useState } from 'react';
// import { db } from './firebase-config';
// import { collection, getDocs } from 'firebase/firestore';
export const CartContext = createContext([]);

function App() {
    // const [products, setProducts] = useState([]);
    // const getProducts = async () => {
    //     const productsCollectionRef = collection(db, 'product');
    //     const data = await getDocs(productsCollectionRef);
    //     setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.Id })));
    // };
    // useEffect(() => {
    //     getProducts();
    // }, []);
    // console.log(products);
    const [productInCart, setProductInCart] = useState(() => {
        const getCart = localStorage.getItem('cartProduct');
        const newCart = JSON.parse(getCart);
        return newCart || [];
    });

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('cartProduct', JSON.stringify(productInCart));
        }, 0);
    }, [productInCart]);
    return (
        <CartContext.Provider
            value={{
                productInCart,
                setProductInCart,
            }}
        >
            <BrowserRouter>
                <div className="App"></div>

                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}

                    <Route element={<PrivateRoute />}>
                        {privateRoutes.map((route, index) => {
                            const Layout = DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartContext.Provider>
    );
}

export default App;
