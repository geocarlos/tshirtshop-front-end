import { types } from '../actions';
import { combineReducers } from 'redux';

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
            return Object.assign({}, state, {products: action.payload, isPeding: false});
        case types.GET_PRODUCTS_FAILED:
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

export default combineReducers({ items, departments, categories, shoppingCart });
