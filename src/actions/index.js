/* Types */
import types from './types'

export const signUp = (url, data) => (dispatch) => {
    asyncPostRequest(
        url, data, dispatch,
        types.SIGNUP,
        types.SIGNUP_SUCCESS,
        types.SIGNUP_FAILED
    )
}

export const getProducts = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_PRODUCTS_PENDING,
        types.GET_PRODUCTS,
        types.GET_PRODUCTS_FAILED,
    );
}

export const getProductsByCategory = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_PRODUCTS_CATEGORY_PENDING,
        types.GET_PRODUCTS_CATEGORY,
        types.GET_PRODUCTS_CATEGORY_FAILED,
    );
}

export const getProduct = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_PRODUCT_PENDING,
        types.GET_PRODUCT,
        types.GET_PRODUCT_FAILED,
    );
}

export const searchProducts = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.SEARCH_PRODUCTS_PENDING,
        types.SEARCH_PRODUCTS,
        types.SEARCH_PRODUCTS_FAILED,
    );
}

export const getDepartments = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_DEPARTMENTS_PENDING,
        types.GET_DEPARTMENTS,
        types.GET_DEPARTMENTS_FAILED
    )
}

export const getCategories = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_CATEGORIES_PENDING,
        types.GET_CATEGORIES,
        types.GET_CATEGORIES_FAILED
    );
}

export const getShoppingCart = (url) => (dispatch) => {
    asyncGetRequest(
        url, dispatch,
        types.GET_SHOPPING_CART_PENDING,
        types.GET_SHOPPING_CART,
        types.GET_SHOPPING_CART_FAILED
    )
}

export const addItemToCart = (url, data) => (dispatch) => {
    asyncPostRequest(
        url, data, dispatch,
        types.ADD_TO_CART,
        types.ADD_TO_CART_SUCCESS,
        types.ADD_TO_CART_FAILED
    )
}

export const removeItemFromCart = (url, data) => (dispatch) => {
    asyncPostRequest(
        url, data, dispatch,
        types.REMOVE_FROM_CART,
        types.REMOVE_FROM_CART_SUCCESS,
        types.REMOVE_FROM_CART_FAILED
    )
}

/**
 * Handle GET requests to API. Depends on redux-thunk
 * @param {String} url
 * @param {String} pendingAction 
 * @param {String} successAction 
 * @param {String} failAction 
 * @param {Function} dispatch 
 */
function asyncGetRequest(url, dispatch, pendingAction, successAction, failAction) {
    dispatch({ type: pendingAction });
    fetch(url)
        .then(res => res.json())
        .then(data => dispatch({
            type: successAction,
            payload: data
        }))
        .catch(error => dispatch({
            type: failAction,
            error: error
        }));
}

/**
 * Handle POST requests to API. Depends on redux-thunk
 * @param {String} url
 * @param {Object} data
 * @param {String} pendingAction 
 * @param {String} successAction 
 * @param {String} failAction 
 * @param {Function} dispatch 
 */
function asyncPostRequest(url, data, dispatch, startAction, successAction, failAction) {
    dispatch({ type: startAction });
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: successAction,
            payload: data
        }))
        .catch(error => dispatch({
            type: failAction,
            error: error
        }));
}
