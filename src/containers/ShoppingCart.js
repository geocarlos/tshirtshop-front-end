/**
 * View where products selected by user are kept.
 * User will place an order from this view. 
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/contexts';
import CartItem from '../components/CartItem';
import { connect } from 'react-redux';
import { getShoppingCart, removeItemFromCart } from '../actions';
import { urls } from '../constants/constants';

class ShoppingCart extends Component {

    componentDidMount() {
        this.props.dispatch(getShoppingCart(urls.URL_CART));
    }

    removeFromCart = (item_id) => {
        const data = { item_id }
        this.props.dispatch(removeItemFromCart(urls.URL_REMOVE_FROM_CART, data));
    }

    render() {

        const { cartItems, isPending, error } = this.props;

        if (error) {
            return (
                <div className='shopping-cart content-wrapper'>
                    <p>Unable to show shopping cart items</p>
                </div>
            )
        }

        if (isPending) {
            return (
                <div className='shopping-cart content-wrapper'>
                    <p>Loading items in your cart...</p>
                </div>
            )
        }

        return (
            <div className='shopping-cart content-wrapper'>
                <h3>Your cart</h3>
                {cartItems.length < 1 ? <div>No items in your cart.</div> :
                    cartItems.map(item => (
                        <CartItem key={item.item_id} item={item} removeFromCart={this.removeFromCart} />
                    ))
                }
                <p><Link className='btn' to='/'>
                    Home
                </Link></p>
            </div>
        )
    }
}

ShoppingCart.contextType = AppContext;

const mapStateToProps = ({ shoppingCart }) => {
    console.log(shoppingCart)
    return {
        cartItems: shoppingCart.cartItems,
        isPending: shoppingCart.isPending,
        error: shoppingCart.error,
        result: shoppingCart.result
    }
}

export default connect(mapStateToProps)(ShoppingCart);