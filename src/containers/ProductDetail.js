/**
 * View for product detail.
 * This may get the product from the loaded list or all 
 * the way from the database, if it is not available on the client.
 * User can add item to the shopping cart from this view.
 */
import React, { Component } from 'react';
import { urls } from '../constants/constants';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {

    constructor(){
        super();
        this.state = {
            product: null
        }
    }

    componentDidMount(){
        fetch(`/api/product/${this.props.id}`)
        .then(res => res.json())
        .then(product => this.setState({ product }))
        .catch(error => console.log(error));    
    }

    render(){

        const { product } = this.state;

        console.log(this.props)

        if(!product) return <div>Not found</div>
        console.log(product.attribute_values)

        return (
            <div className='product-detail'>
                <h2>{product.name}</h2>
                <img src={urls.URL_MEDIA + product.image} alt={`T-shirt with ${product.name}`}/>
                <img src={urls.URL_MEDIA + product.image_2} alt={product.name}/>
                <p>{product.description}</p>
                {product.discounted_price > 0 && 
                    <p className='price'>Price: <span className='line-through'>{product.price}</span>{product.discounted_price}</p> ||
                <p>Price: {product.price}</p>}
                <Link className='btn' to='/'>
                    Home
                </Link>
                {product.attribute_values.map((a, i) => (<p>{a.value}</p>))}
            </div>
        )
    }
}

export default ProductDetail;