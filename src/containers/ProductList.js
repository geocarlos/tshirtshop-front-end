/**
 * This lists all products or products related to a selected category.
 * Categories, in turn, are organized according to departments.
 * Users can click an item to view its details, as well add it to shopping cart.
 */
import React, { Component, useContext } from 'react';
import AppContext from '../contexts/contexts';
import ListItemCard from '../components/ListItemCard';
import { connect } from 'react-redux';
import { getProducts, addItemToCart } from '../actions';
import { urls } from '../constants/constants';

class ProductList extends Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        try{
            this.props.dispatch(getProducts(urls.URL_PRODUCTS));
        } catch(error){
            console.log(error);
        }
    }

    addToCart = (item) => {
        const data = {
          product_id: item.product_id,
          _attributes: 'M, White',
          quantity: 1,
          buy_now: 1
        }

        this.props.dispatch(addItemToCart(urls.URL_ADD_TO_CART, data));
      }

    render() {

        const { products, isPending, error } = this.props;

        if(error){
            return (
                <div className='product-list'>
                    Unable to display items.
                </div>
            )
        }

        return (
            <div className='product-list'>
                {isPending ?
                <p>Loading items...</p> 
                :
                <ul>
                    {products.map(product => (
                        <li key={product.product_id}>
                            <ListItemCard addToCart={this.addToCart} product={product} />
                        </li>
                    ))}
                </ul>}
            </div>
        );
    }
}

const mapStateTorProps = ({ items }) => {
    return { 
        products: items.products, 
        isPending: items.isPending, 
        error: items.error 
    }
}

ProductList.contextType = AppContext;

export default connect(mapStateTorProps)(ProductList);