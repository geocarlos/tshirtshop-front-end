import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDepartments, getCategories, getProductsByCategory } from '../actions';
import { urls } from '../constants/constants';
import { slugify } from '../helpers/helpers';
import AppContext from '../contexts/contexts';

class SideMenu extends Component {

    componentDidMount() {
        this.props.dispatch(getDepartments(urls.URL_DEPARTMENTS));
        this.props.dispatch(getCategories(urls.URL_CATEGORIES));
    }

    getProductsByCategory = (category) => {
        this.props.dispatch(getProductsByCategory(urls.URL_PRODUCTS_CATEGORY + category.category_id));
        this.context.setPagingUrl(`/department/${slugify(category.department.name)}/${category.category_id}/${slugify(category.name)}`);
        this.props.dispatch({type: 'SET_CURRENT_PAGE', payload: 0});
    }

    render() {
        const { departments, categories } = this.props;

        if (departments.isPending || categories.isPending) {
            return <div className='side-menu'>Loading...</div>
        }

        if (departments.error || categories.error) {
            return <div className='side-menu'>Unable to load categories or departments</div>
        }

        return (
            <div className='side-menu'>
                <Link to='/'>All items</Link>
                {departments.items.map(department => (
                    <ul key={department.department_id}>
                        <li>
                            <div key={department.name} className='department-heading'>{department.name}</div>
                            {categories.items.map(category => (
                                <ul key={category.name}>
                                    {category.department_id === department.department_id &&
                                        <li key={category.category_id}>
                                            <div className='category-list'>
                                                <Link
                                                    to={`/department/${slugify(department.name)}/${category.category_id}/${slugify(category.name)}`}
                                                    onClick={() => this.getProductsByCategory(category)}
                                                >
                                                    {category.name}
                                                </Link>
                                            </div>
                                        </li>
                                    }
                                </ul>
                            ))}
                        </li>
                    </ul>
                ))}
            </div>
        )
    }
}

const mapStateToPros = ({ departments, categories }) => ({
    departments, categories
});

SideMenu.contextType = AppContext;

export default connect(mapStateToPros)(SideMenu);