import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    return (
      <div>
        {
          cartList.length > 0 ? (
            cartList.map((product) => (
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
