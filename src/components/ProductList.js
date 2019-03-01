/**
 * This lists all products or products related to a selected category.
 * Categories, in turn, are organized according to departments.
 * Users can click an item to view its details, as well add it to shopping cart.
 */
import React, { Component } from 'react';

class ProductList extends Component {

    constructor(){
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            this.setState({products});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        const { products } = this.state;
        return (
            <div>
                <ul>
                    { products.map( p =>(
                        <li key={p.product_id}>{p.product_id} - {p.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProductList;