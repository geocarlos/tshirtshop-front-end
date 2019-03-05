import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDepartments, getCategories } from '../actions';
import { urls } from '../constants/constants';

class SideMenu extends Component {

    componentDidMount(){
        this.props.dispatch(getDepartments(urls.URL_DEPARTMENTS));
        this.props.dispatch(getCategories(urls.URL_CATEGORIES))
    }

    render() {
        const { departments, categories } = this.props;
        
        if (departments.isPending || categories.isPending) {
            return <div className='side-menu'>Loading...</div>
        }

        if(departments.error || categories.error){
            return <div className='side-menu'>Unable to load categories or departments</div>
        }

        return (
            <div className='side-menue'>
                {departments.items.map(department => (
                    <ul key={department.name}>
                        <li>
                            <div key={department.name} className='department-heading'>{department.name}</div>
                            {categories.items.map(category => (
                                <ul key={category.name}>
                                    {category.department_id === department.department_id &&
                                        <li key={category.category_id}>
                                            <div className='category-list'>{category.name}</div>
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

export default connect(mapStateToPros)(SideMenu);