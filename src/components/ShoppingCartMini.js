/**
 * This component is a class because it needs to track
 * the number of items in the cart and nees to be rendered
 * in the main App component.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ShoppingCartMini extends Component {

    render() {
        
        const { cartItemCount } = this.props;

        return (
            <div className='cart-mini'>
                <p>You cart has {cartItemCount} items</p>
                <Link className='btn' to='/items/shopping-cart'>View cart</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ shoppingCart }) => ({
    cartItemCount: shoppingCart.cartItems.length
});

export default connect(mapStateToProps)(ShoppingCartMini);