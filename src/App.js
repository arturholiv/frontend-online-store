import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shoppingCart" component={ ShoppingCart } />
        <Route path="/productDetails/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
