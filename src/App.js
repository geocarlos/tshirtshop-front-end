import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { isLoggedIn } from './actions';
import { urls } from './constants/constants';
import AppContext from './contexts/contexts';
import ProductList from './containers/ProductList';
import ProductCategory from './containers/ProductCategory';
import Locale from './locales/Locale';
import ProductDetail from './containers/ProductDetail';
import ShoppingCartMini from './components/ShoppingCartMini';
import ShoppingCart from './containers/ShoppingCart';
import Header from './components/Header';
import SideMenu from './containers/SideMenu';
import Order from './containers/Order';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lang: 'en',
      cartItems: [],
      pagingUrl: '/products'
    }
  }

  componentDidMount(){
    this.props.dispatch(isLoggedIn(urls.URL_IS_LOGGED_IN));
  }

  setLanguage = (lang) => {
    this.setState({ lang });
    Locale.loadLanguage(lang);
  }

  setPagingUrl = (pagingUrl) => {
    this.setState({ pagingUrl });
  }

  render() {
    return (
      <Router>
        <AppContext.Provider
          value={{
            lang: this.state.lang,
            translate: Locale.translate,
            pagingUrl: this.state.pagingUrl,
            setPagingUrl: this.setPagingUrl
          }}>
          <div className='container'>
            <Header />
            <SideMenu />
            <Route exact path='/' render={() => (
              <div className='content-wrapper'>
                <ShoppingCartMini />
                <ProductList setLang={this.setLanguage} />
              </div>
            )} />

            <Route exact path='/products' render={({ match }) => (
              <div className='content-wrapper'>
                <ShoppingCartMini />
                <ProductList pageNumber={!match.query ? 0 : match.query.page} />
              </div>
            )} />

            <Route path='/products/details/:id/:product_name' render={({ match }) => (
              <div className='content-wrapper'>
                <ShoppingCartMini />
                <ProductDetail id={match.params.id} />
              </div>
            )} />

            <Route path='/department/:department/:id/:category' render={({ match }) => { console.log(match); return (
              <div className='content-wrapper'>
                <ShoppingCartMini />
                <ProductCategory id={ match.params.id } />
              </div>
            )}} />           

            <Route exact path='/items/shopping-cart' render={() => (
              <ShoppingCart />
            )} />

            <Route path='/items/shopping-cart/checkout' render={() => (
              <Order />
            )}/>

            <Route path='/auth/signup' render={() => (
              <SignUp />
            )}/>

            <Route path='/auth/signin' render={() => (
              <SignIn />
            )}/>
          </div>
        </AppContext.Provider>
      </Router>
    );
  }
}

export default connect()(App);
