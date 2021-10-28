import PropTypes from 'prop-types';
import React from 'react';

class ButtonAddAndRevome extends React.Component {
  render() {
    const { name, handleAddToCartButton, product, handleRemoveToCartButton,
    } = this.props;
    return (
      <div>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ (event) => handleRemoveToCartButton(product, event) }
          name={ name }
          id="menos"
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{ product.quantity }</span>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ (event) => handleAddToCartButton(product, event) }
          name={ name }
          id="mais"
        >
          +
        </button>
      </div>
    );
  }
}

ButtonAddAndRevome.propTypes = {
  handleAddToCartButton: PropTypes.func.isRequired,
  handleRemoveToCartButton: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  product: PropTypes.shape({
    quantity: PropTypes.number,
  }).isRequired,
};

export default ButtonAddAndRevome;
