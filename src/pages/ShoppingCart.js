import PropTypes from 'prop-types';
import React from 'react';
import ButtonAddAndRevome from '../components/ButtonAddAndRevome';

class ShoppingCart extends React.Component {
  // handleRemoveToCartButton = ({ title, thumbnail, price, id }) => {
  //   const { cartProductsList } = this.props;
  //   const productObject = { title, thumbnail, price, quantity: 1, id };
  //   let cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
  //   if (cartList.length === 0) {
  //     cartList = [
  //       productObject,
  //     ];
  //   } else {
  //     const productExist = cartList.find((product) => product.id === id);
  //     if (productExist) {
  //       cartList.forEach((object) => {
  //         if (object.id === id) {
  //           object.quantity -= 1;
  //         }
  //       });
  //     } else {
  //       cartList.push(productObject);
  //     }
  //   }
  //   localStorage.setItem('cartList', JSON.stringify(cartList));

  //   this.setState({ cartProductsList: [...cartList] });
  // };

  render() {
    const { handleAddToCartButton, handleRemoveToCartButton } = this.props;

    const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    return (
      <div>
        {
          cartList.length > 0 ? (
            cartList.map((product) => (
              <div key={ product.title }>
                <div>
                  <div>
                    <h4 data-testid="shopping-cart-product-name">{product.title}</h4>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{product.price}</p>
                  </div>
                  {/* <p data-testid="shopping-cart-product-quantity">1</p> */}
                </div>
                <ButtonAddAndRevome
                  handleAddToCartButton={ handleAddToCartButton }
                  handleRemoveToCartButton={ handleRemoveToCartButton }
                  name={ product.id }
                  product={ product }
                />
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

ShoppingCart.propTypes = {
  handleAddToCartButton: PropTypes.func.isRequired,
  handleRemoveToCartButton: PropTypes.func.isRequired,
};

export default ShoppingCart;
