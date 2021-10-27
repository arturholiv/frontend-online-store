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
    const list = await getCategories();
    this.setState({ categoriesList: list });
  }

  async getNameAndId({ target }) {
    const { id, value } = target;
    const returned = await getProductsFromCategoryAndQuery(id, value);
    this.setState({ responseApi: returned.results });
  }

  render() {
    const { categoriesList, searchValue, responseApi } = this.state;
    return (
      <div>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <label htmlFor="input-search">
          <input
            data-testid="query-input"
            type="text"
            id="input-search"
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
        <Link to="/shoppingCart" data-testid="shopping-cart-button">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
            alt="cart"
          />
        </Link>
        <section>
          <div className="categories-list">
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
        <main>
          {responseApi.length > 0 ? (
            responseApi.map((response) => (
              <Link
                to={ `/productDetails/${response.id}` }
                data-testid="product-detail-link"
                key={ response.id }
              >
                <Card
                  title={ response.title }
                  thumbnail={ response.thumbnail }
                  price={ response.price }
                />
              </Link>
            ))
          ) : (
            <span>Nenhum produto foi encontrado</span>
          )}
        </main>
      </div>
    );
  }
}

export default Home;
