import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContext from './contexts/contexts';
import ProductList from './containers/ProductList';
import Locale from './locales/Locale';
import ProductDetail from './containers/ProductDetail';
import ShoppingCartMini from './components/ShoppingCartMini';
import ShoppingCart from './containers/ShoppingCart';
import Header from './components/Header';
import SideMenu from './containers/SideMenu';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lang: 'en',
      cartItems: []
    }
  }
  
  setLanguage = (lang) => {
    this.setState({ lang });
    Locale.loadLanguage(lang);
  }  

  render() {
    return (
      <Router>
        <AppContext.Provider
          value={{
            lang: this.state.lang,
            translate: Locale.translate
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

            <Route path='/department/category/:id/:product_name' render={({ match }) => (
              <div className='content-wrapper'>
                <ShoppingCartMini />
                <ProductDetail id={match.params.id} />
              </div>
            )} />

          <Route path='/items/shopping-cart' render={() => (
            <ShoppingCart />
          )} />
          </div>
        </AppContext.Provider>
      </Router>
    );
  }
}

export default App;
