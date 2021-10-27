import React from 'react';
// import Card from '../components/Card';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.saveCart = this.saveCart.bind(this);
    this.state = {
      cartListState: [],
    };
  }

  componentDidMount() {
    this.saveCart();
  }

  saveCart() {
    const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    this.setState({
      cartListState: cartList,
    });
  }

  render() {
    const { cartListState } = this.state;
    return (
      <div>
        {
          cartListState.length > 0 ? (
            cartListState.map((product) => (
              <div key={ product.title }>
                <div>
                  <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{product.price}</p>
                </div>
                <p data-testid="shopping-cart-product-quantity">1</p>
              </div>
            ))
          )
            : (
              <div>
                <span
                  data-testid="shopping-cart-empty-message"
                >
                  Seu carrinho está vazio
                </span>
              </div>
            )
        }
      </div>

    );
  }
}
export default ShoppingCart;
