/**
 * View for product detail.
 * This may get the product from the loaded list or all 
 * the way from the database, if it is not available on the client.
 * User can add item to the shopping cart from this view.
 */
import React, { Component } from 'react';
import { urls } from '../constants/constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct, addItemToCart } from '../actions';
import AttributeValues from '../components/AttributeValues';

class ProductDetail extends Component {

    constructor() {
        super();
        this.state = {
            color: 'White',
            size: 'M'
        }
    }

    componentDidMount() {
        console.log(this.props.id)
        this.props.dispatch(getProduct(urls.URL_PRODUCT + this.props.id))
    }

    addToCart = item => {
        const data = {
            product_id: item.product_id,
            _attributes: `${this.state.color}, ${this.state.size}`,
            quantity: 1,
            buy_now: 1
        }

        this.props.dispatch(addItemToCart(urls.URL_ADD_TO_CART, data));
    }

    setColor = color => {
        this.setState({ color });
        console.log(this.state.color);
    }

    setSize = size => {
        console.log(size)
        this.setState({ size });
        console.log(this.state.size);
    }

    render() {

        const { product, isPending, error } = this.props;

        if (error) return (
            <div className='product-detail'>Not found</div>
        )

        if (isPending) return (
            <div className='product-detail'>Loading...</div>
        )

        return (
            <div className='product-detail'>
                <h2>{product.name}</h2>
                <img src={urls.URL_MEDIA + product.image} alt={`T-shirt with ${product.name}`} />
                <img src={urls.URL_MEDIA + product.image_2} alt={product.name} />
                <p>{product.description}</p>
                {product.discounted_price > 0 &&
                    <p className='price'>Price: <span className='line-through'>{product.price}</span>{product.discounted_price}</p> ||
                    <p>Price: {product.price}</p>}
                <Link className='btn' to='/'>
                    Home
                </Link>
                <button className='btn' onClick={() => this.addToCart(product)}>Add to Cart</button>
                {product.attribute_values &&
                    <AttributeValues attributes={product.attribute_values} setColor={this.setColor} setSize={this.setSize} />}
            </div>
        )
    }
}

const mapStateToPros = ({ product }) => ({
    product: product.item,
    isPending: product.isPending,
    error: product.error
})

export default connect(mapStateToPros)(ProductDetail);