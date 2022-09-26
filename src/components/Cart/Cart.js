import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
    // console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        // console.log(quantity);
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
    }

    const tax = (parseFloat(totalPrice * 0.1));
    const grandTotal = (totalPrice + totalShipping + tax).toFixed(2);
    return (
        <div className='cart'>
            <h4 className='summary'>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal}</h4>
        </div>
    );
};

export default Cart;