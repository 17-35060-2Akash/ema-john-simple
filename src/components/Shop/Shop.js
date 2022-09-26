import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getStoredCart();
        let savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(savedCart);
                setCart(savedCart);
            }
        }
    }, [products]);

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const existes = cart.find(product => product.id === selectedProduct.id);
        if (!existes) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id != selectedProduct.id);
            existes.quantity = existes.quantity + 1;
            newCart = [...rest, existes];
        }

        setCart(newCart);
        addToDb(selectedProduct.id);
    };

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;