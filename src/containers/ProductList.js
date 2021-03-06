/**
 * This lists all products or products related to a selected category.
 * Categories, in turn, are organized according to departments.
 * Users can click an item to view its details, as well add it to shopping cart.
 */
import React, { Component } from 'react';
import AppContext from '../contexts/contexts';
import ListItemCard from '../components/ListItemCard';
import { connect } from 'react-redux';
import { getProducts, searchProducts } from '../actions';
import { urls } from '../constants/constants';
import PageLinks from '../components/PageLinks';
import SearchBox from '../components/SearchBox';
import { getQueries } from '../helpers/helpers';

class ProductList extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 0,
            searchTerm: ''
        }
    }

    componentDidMount() {

        this.props.dispatch(getProducts(urls.URL_PRODUCTS));
        this.context.setPagingUrl('/products');

        /* Allow for bookmarking */
        const query = getQueries();
        if (query.page) {
            this.setCurrentPage(query.page - 1)
        }
    }

    setCurrentPage = currentPage => {
        this.setState({ currentPage })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.searchTerm);
        this.props.dispatch(searchProducts(urls.URL_SEARCH + this.state.searchTerm))
    }

    getSearchTerm = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    render() {

        const { products, isPending, error } = this.props;
        const { currentPage } = this.state;

        console.log(products[0]);

        if (error) {
            return (
                <div className='product-list'>
                    Unable to display items.
                </div>
            )
        }

        return (
            <div className='product-list'>
                <SearchBox term={this.state.searchTerm} handleSubmit={this.handleSubmit} doSearch={this.getSearchTerm} />
                {isPending ?
                    <p>Loading items...</p>
                    :
                    <ul className='item-list'>
                        {products.length > 0 && products[currentPage].map(product => (
                            <li key={product.product_id}>
                                <ListItemCard product={product} />
                            </li>
                        ))}
                    </ul>}
                {products.length > 1 && <PageLinks items={products} setPage={this.setCurrentPage} />}
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