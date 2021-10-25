import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="input-search">
          <input
            type="text"
            id="input-search"
          />
        </label>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <img
            src="https://files.slack.com/files-pri/TMDDFEPFU-F02JWM7D9EZ/shoppingcarticon.png"
            alt="cart-img"
          />
        </Link>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
      </div>
    );
  }
}
export default Home;
