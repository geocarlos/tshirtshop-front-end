import types from '../actions/types';
import { combineReducers } from 'redux';
import { setPages } from '../helpers/helpers';
import { itemsPerPage } from '../constants/constants';

const initialStateItems = {
    isPending: false,
    products: [],
    error: ''
};

const items = (state = initialStateItems, action) => {
    switch(action.type){
        case types.GET_PRODUCTS_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_PRODUCTS:
            return Object.assign({}, state, {products: setPages(action.payload, itemsPerPage), isPeding: false});
        case types.GET_PRODUCTS_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true});
        case types.GET_PRODUCTS_CATEGORY_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_PRODUCTS_CATEGORY:
            return Object.assign({}, state, {products: setPages(action.payload, itemsPerPage), isPeding: false});
        case types.GET_PRODUCTS_CATEGORY_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true}); 
        case types.SEARCH_PRODUCTS_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.SEARCH_PRODUCTS:
            return Object.assign({}, state, {products: setPages(action.payload, itemsPerPage), isPeding: false});
        case types.SEARCH_PRODUCTS_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true});     
        default:
            return state;
    }
}

const initialStateItem = {
    isPending: false,
    item: {},
    error: ''
};

const product = (state = initialStateItem, action) => {
    switch(action.type){
        case types.GET_PRODUCT_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_PRODUCT:
            return Object.assign({}, state, {item: action.payload, isPeding: false});
        case types.GET_PRODUCT_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true}); 
        default:
            return state;
    }
}


const initialStateDepartments = {
    isPending: false,
    items: [],
    error: ''
};

const departments = (state = initialStateDepartments, action) => {
    switch(action.type){
        case types.GET_DEPARTMENTS_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_DEPARTMENTS:
            return Object.assign({}, state, {items: action.payload, isPeding: false});
        case types.GET_DEPARTMENTS_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true});     
        default:
            return state;
    }
}

const initialStateCategories = {
    isPending: false,
    items: [],
    error: ''
};

const categories = (state = initialStateCategories, action) => {
    switch(action.type){
        case types.GET_CATEGORIES_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_CATEGORIES:
            return Object.assign({}, state, {items: action.payload, isPeding: false});
        case types.GET_CATEGORIES_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true});     
        default:
            return state;
    }
}


const initialStateCart = {
    isPending: false,
    cartItems: [],
    error: ''
}

const shoppingCart = (state = initialStateCart, action) => {
    switch(action.type){
        case types.GET_SHOPPING_CART_PENDING:
            return Object.assign({}, state, {isPeding: true});
        case types.GET_SHOPPING_CART:
            return Object.assign({}, state, {cartItems: action.payload, isPeding: false});
        case types.GET_SHOPPING_CART_FAILED:
            return Object.assign({}, state, {error: action.error, isPeding: true});   
        case types.ADD_TO_CART:
            return {
                ...state, isPending: true
            };
        case types.ADD_TO_CART_SUCCESS:
            return {
                ...state, cartItems: [...state.cartItems, action.payload], isPending: false
            };
        case types.REMOVE_FROM_CART:
            return {
                ...state, isPending: true
            };
        case types.REMOVE_FROM_CART_SUCCESS:
            return {
                ...state, 
                cartItems: state.cartItems.filter(item => item.item_id != action.payload.item_id), 
                isPending: false
            };
        default:
            return state;
    }
}

const initialStateSignUp = {
    isPending: false,
    user: {},
    error: ''
}

const signUp = (state = initialStateSignUp, action) => {
    switch(action.type){
        case types.SIGNUP:
            return {
                ...state, isPending: true
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state, user: action.payload, isPending: false
            }
        case types.SIGNUP_FAILED:
            return {
                ...state, error: action.error, isPending: false
            }
        default:
            return state;
    }
}

const initialStateSignIn = {
    isPending: false,
    result: {},
    error: ''
}

const signIn = (state = initialStateSignIn, action) => {
    switch(action.type){
        case types.SIGNIN:
            return {
                ...state, isPending: true
            }
        case types.SIGNIN_SUCCESS:
            return {
                ...state, result: action.payload, isPending: false
            }
        case types.SIGNIN_FAILED:
            return {
                ...state, error: action.error, isPending: false
            }
        default:
            return state;
    }
}

const initialStateIsLoggedIn = {
    isPending: false,
    currentUser: {isAuthenticated: false, user: null},
    error: ''
}

const isUserLoggedIn = (state = initialStateIsLoggedIn, action) => {
    switch(action.type){
        case types.IS_LOGGED_IN_PENDING:
            return {
                ...state, isPending: true
            }
        case types.IS_LOGGED_IN:
            return {
                ...state, currentUser: action.payload, isPending: false
            }
        case types.IS_LOGGED_IN_FAILED:
            return {
                ...state, error: action.error, isPending: false
            }
        default:
            return state;
    }
}

const currentPage = (state = {page: 0}, action) => {
    switch(action.type){
        case 'SET_CURRENT_PAGE':
            return Object.assign({}, state, {page: action.payload});
        default:
            return state;
    }
}

export default combineReducers({ 
    items, 
    product, 
    departments, 
    categories, 
    shoppingCart, 
    currentPage, 
    signUp,
    signIn,
    isUserLoggedIn
});
