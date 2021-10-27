import PropTypes from 'prop-types';
import React from 'react';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      productObject: {},
      productDescription: '',
      productDescriptionValue: '',
    };
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  async getProductDetails() {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const objectResponse = await response.json();
    this.setState({
      productObject: objectResponse,
      productDescription: objectResponse.attributes[0].name,
      productDescriptionValue: objectResponse.attributes[0].value_name,
    });
  }

  render() {
    const { productObject, productDescription, productDescriptionValue } = this.state;
    return (
      <div>
        <h4 data-testid="product-detail-name">{ productObject.title }</h4>
        <img src={ productObject.thumbnail } alt={ productObject.title } />
        <p>{ productObject.price }</p>
        <p>{ `${productDescription}: ${productDescriptionValue}` }</p>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default ProductDetails;
