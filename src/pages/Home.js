import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.getCategoriesList = this.getCategoriesList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getNameAndId = this.getNameAndId.bind(this);

    this.state = {
      categoriesList: [],
      searchValue: '',
      responseApi: [],
      // cartProductsList: [],
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      searchValue: value,
    });
  }

  async getProducts() {
    const { searchValue, categoriesList } = this.state;
    const categorieObj = categoriesList
      .filter((categorie) => categorie.name.includes(searchValue));
    const returnedApi = await
    getProductsFromCategoryAndQuery(categorieObj.id, searchValue);
    this.setState({ responseApi: returnedApi.results });
  }

  async getCategoriesList() {
    try {
      const list = await getCategories();
      return this.setState({ categoriesList: list });
    } catch (error) {
      console.error(error.message);
    }
  }

  async getNameAndId({ target }) {
    const { id, value } = target;
    const returned = await getProductsFromCategoryAndQuery(id, value);
    this.setState({ responseApi: returned.results });
  }

  render() {
    const { handleAddToCartButton } = this.props;
    const { categoriesList, searchValue, responseApi } = this.state;
    return (
      <div className="pages">
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <div className="input-and-button-search">
          <label htmlFor="input-search">
            <input
              data-testid="query-input"
              type="text"
              id="input-search"
              placeholder="Pesquise seu produto"
              value={ searchValue }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.getProducts }
            data-testid="query-button"
          >
            <img
              src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
              alt="search-button"
            />
          </button>
        </div>
        <div className="go-to-cart-button">
          <Link to="/shoppingCart" data-testid="shopping-cart-button">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
              alt="cart"
            />
          </Link>
        </div>
        <div className="home">
          <section className="categories-list">
            <div>
              {categoriesList.map((categories) => (
                <label key={ categories.id } htmlFor={ categories.id }>
                  <input
                    type="radio"
                    id={ categories.id }
                    name="category"
                    onClick={ this.getNameAndId }
                    value={ categories.name }
                    data-testid="category"
                  />
                  {categories.name}
                </label>
              ))}
            </div>
          </section>
          <main className="listedProducts">
            {responseApi.length > 0 ? (
              responseApi.map((product) => (
                <div key={ product.id } className="product-card">
                  <Link
                    to={ `/productDetails/${product.id}` }
                    data-testid="product-detail-link"
                  >
                    <Card
                      title={ product.title }
                      thumbnail={ product.thumbnail }
                      price={ product.price }
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={ (event) => handleAddToCartButton(product, event) }
                    data-testid="product-add-to-cart"
                    id={ product.title }
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <h1>Nenhum produto foi encontrado</h1>
            )}
          </main>
        </div>
      </div>

    );
  }
}

Home.propTypes = {
  handleAddToCartButton: PropTypes.func.isRequired,
};

export default Home;
