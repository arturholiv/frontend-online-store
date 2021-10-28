import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cartProductsList: [],
    };
  }

  handleAddToCartButton = ({ title, thumbnail, price, id }) => {
    const productObject = { title, thumbnail, price, quantity: 1, id };
    let cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    if (cartList.length === 0) {
      cartList = [
        productObject,
      ];
    } else {
      const productExist = cartList.find((product) => product.id === id);
      if (productExist) {
        cartList.forEach((object) => {
          if (object.id === id) {
            object.quantity += 1;
          }
        });
      } else {
        cartList.push(productObject);
      }
    }
    localStorage.setItem('cartList', JSON.stringify(cartList));

    this.setState({ cartProductsList: [...cartList] });
  };

  handleRemoveToCartButton = ({ title, thumbnail, price, id }) => {
    const productObject = { title, thumbnail, price, quantity: 1, id };
    let cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    if (cartList.length === 0) {
      cartList = [
        productObject,
      ];
    } else {
      const productExist = cartList.find((product) => product.id === id);
      if (productExist) {
        cartList.forEach((object) => {
          if (object.id === id) {
            object.quantity -= 1;
          }
        });
      } else {
        cartList.push(productObject);
      }
    }
    localStorage.setItem('cartList', JSON.stringify(cartList));

    this.setState({ cartProductsList: [...cartList] });
  };

  render() {
    const { cartProductsList } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              handleAddToCartButton={ this.handleAddToCartButton }
              cartProductsList={ cartProductsList }
              { ...props }
            />) }
          />
          <Route
            path="/shoppingCart"
            render={ (props) => (<ShoppingCart
              handleAddToCartButton={ this.handleAddToCartButton }
              handleRemoveToCartButton={ this.handleRemoveToCartButton }
              { ...props }
            />) }
          />
          <Route path="/productDetails/:id" component={ ProductDetails } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
