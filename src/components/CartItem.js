import React from 'react';
import { urls } from '../constants/constants';

const CartItem = ({ item, removeFromCart }) => {
    
    if(!item.product){
        return <div></div>
    }

    return (
        <div className='cart-item'>
            <h3>{item.product.name}</h3>
            <img src={`${urls.URL_MEDIA + item.product.thumbnail}`}
                alt={`T-shirt with ${item.product.name}`} />
            {item.discounted_price > 0 &&
                <p className='price'>Price: 
                    <span className='line-through'>{item.product.price}</span>{item.product.discounted_price}</p> ||
                <p>Price {item.product.price}</p>}
                <button className='btn' onClick={() => removeFromCart(item.item_id)}>Remove from Cart</button>
        </div>
    )
}

export default CartItem;