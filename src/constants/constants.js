const urls = { 
    URL_MEDIA: '/api/media/images/product_images/',
    URL_PRODUCT: '/api/products/',
    URL_PRODUCTS:'/api/products',
    URL_PRODUCTS_CATEGORY:'/api/products/category/',
    URL_SEARCH: '/api/products/search/?q=',
    URL_DEPARTMENTS: '/api/departments',
    URL_CATEGORIES: '/api/categories',
    URL_CART: '/api/shopping-cart',
    URL_ADD_TO_CART: '/api/shopping-cart/add-to-cart',
    URL_REMOVE_FROM_CART: '/api/shopping-cart/remove-from-cart',
    URL_SIGNUP: '/auth/sign-up',
    URL_SIGNIN: '/auth/sign-in',
    URL_IS_LOGGED_IN: '/api/user/is-logged-in'
}

const itemsPerPage = 10;


export { urls, itemsPerPage };