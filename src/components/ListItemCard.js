import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../helpers/helpers';
import AppContext from '../contexts/contexts';

const ListItemCard = ({ product, addToCart }) => {
    return (
        <AppContext.Consumer>
        {({})=>(<div className='list-item-card'>
            <div>
                <h3>{product.name}</h3>
                <img src={`/api/media/images/product_images/${product.thumbnail}`} 
                    alt={`T-shirt with ${product.name}`}/>
                {product.discounted_price > 0 && 
                    <p className='price'>Price: <span className='line-through'>{product.price}</span>{product.discounted_price}</p> ||
                <p>Price {product.price}</p>}
            </div>
            <p className='description'>
                {product.description}                
            </p>
            <Link className='btn' to={`/department/category/${product.product_id}/${slugify(product.name)}`}>
                    Details
                </Link>
                <button className='btn' onClick={() => addToCart(product)}>Add to Cart</button>
        </div>)}
        </AppContext.Consumer>
    )
}

export default ListItemCard;