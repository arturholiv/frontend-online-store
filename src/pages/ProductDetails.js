import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      productObject: {},
      productDescription: '',
      productDescriptionValue: '',
      inputName: '',
      inputRadio: '',
      textArea: '',
      listOfRatings: [],
      cartProductsList: [],
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.handleAddToCartButton = this.handleAddToCartButton.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
    this.getRatings();
  }

  handleAddToCartButton({ title, thumbnail, price, id }) {
    // const { cartProductsList } = this.state;
    const productObject = { title, thumbnail, price, quantity: 1, id };
    let cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    if (cartList.length === 0) {
      cartList = [
        productObject,
      ];
    } else {
      cartList.push(productObject);
    }
    localStorage.setItem('cartList', JSON.stringify(cartList));

    this.setState(({ cartProductsList }) => (
      { cartProductsList: [...cartProductsList, productObject] }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { inputName, inputRadio, textArea } = this.state;

    let listaPessoas = JSON.parse(localStorage.getItem('listaPessoas') || '[]'); // Link onde consultei para fazer a lógica do localStorage => https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js#:~:text=Seu%20c%C3%B3digo%20j%C3%A1%20est%C3%A1%20quase%20funcionando%2C%20basta%20apenas%20pegar%20as%20pessoas%20que%20j%C3%A1%20est%C3%A3o%20salvas%20com%20Storage.getItem()%2C%20adicionar%20a%20nova%20pessoa%20no%20array%20(Array.push())%20e%20salvar%20de%20volta%20(Storage.setItem()).
    if (listaPessoas.length === 0) {
      listaPessoas = [
        {
          inputName,
          inputRadio,
          textArea,
        },
      ];
    } else {
      listaPessoas.push({
        inputName,
        inputRadio,
        textArea,
      });
    }

    localStorage.setItem('listaPessoas', JSON.stringify(listaPessoas));
  }

  getRatings() {
    const listOfRatings = JSON.parse(localStorage.getItem('listaPessoas'));
    this.setState({
      listOfRatings,
    });
  }

  async getProductDetails() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const objectResponse = await response.json();
    this.setState({
      productObject: objectResponse,
      productDescription: objectResponse.attributes[0].name,
      productDescriptionValue: objectResponse.attributes[0].value_name,
    });
  }

  saveItem = (productObject) => {
    const item = { title: productObject.title };
    localStorage.setItem('cart', JSON.stringify(item));
  }

  render() {
    const {
      productObject,
      productDescription,
      productDescriptionValue,
      inputName,
      textArea,
      listOfRatings,
    } = this.state;
    return (
      <div className="pages">
        <h4 data-testid="product-detail-name">{productObject.title}</h4>
        <img src={ productObject.thumbnail } alt={ productObject.title } />
        <p>{productObject.price}</p>
        <p>{`${productDescription}: ${productDescriptionValue}`}</p>
        <button
          type="button"
          onClick={ (event) => this.handleAddToCartButton(productObject, event) }
          data-testid="product-detail-add-to-cart"
          id={ productObject.title }
        >
          Add to Cart
        </button>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
            alt="cart"
          />
        </Link>
        <fieldset>
          <h3>Avaliações</h3>
          <form>
            <label htmlFor="input-name">
              <p>Nome</p>
              <input
                type="text"
                name="inputName"
                value={ inputName }
                id="input-name"
                onChange={ this.handleChange }
              />
            </label>
            <p>Nota:</p>
            <label htmlFor="input-1">
              <input
                type="radio"
                name="inputRadio"
                value="1"
                onChange={ this.handleChange }
                id="input-1"
              />
              1
            </label>
            <label htmlFor="input-2">
              <input
                type="radio"
                name="inputRadio"
                value="2"
                onChange={ this.handleChange }
                id="input-2"
              />
              2
            </label>
            <label htmlFor="input-3">
              <input
                type="radio"
                name="inputRadio"
                value="3"
                onChange={ this.handleChange }
                id="input-3"
              />
              3
            </label>
            <label htmlFor="input-4">
              <input
                type="radio"
                name="inputRadio"
                value="4"
                onChange={ this.handleChange }
                id="input-4"
              />
              4
            </label>
            <label htmlFor="input-5">
              <input
                type="radio"
                name="inputRadio"
                value="5"
                onChange={ this.handleChange }
                id="input-5"
              />
              5
            </label>
            <div>
              <textarea
                name="textArea"
                value={ textArea }
                onChange={ this.handleChange }
                id="textarea"
                cols="30"
                rows="10"
                placeholder="Mensagem opcional"
                data-testid="product-detail-evaluation"
              />
            </div>
            <button type="submit" onClick={ this.handleClick }>
              Avaliar
            </button>
          </form>
        </fieldset>
        {listOfRatings !== null
        && listOfRatings.map((ratings) => (
          <fieldset key={ ratings.inputName }>
            <p>{ratings.inputName}</p>
            <p>{`Nota: ${ratings.inputRadio}`}</p>
            <p>{ratings.textArea}</p>
          </fieldset>
        ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
