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
    console.log(categorieObj);
    const returnedApi = await getProductsFromCategoryAndQuery(categorieObj.id, searchValue);
    this.setState({ responseApi: returnedApi.results });
  }

  async getCategoriesList() {
    const list = await getCategories();
    this.setState({ categoriesList: list });
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
          <ul>
            { categoriesList
              .map((categories) => (
                <li data-testid="category" key={ categories.id }>{ categories.name }</li>
              )) }
          </ul>
        </section>
        <main>
          {responseApi.length > 0
            ? responseApi
              .map((response) => (<Card
                key={ response.id }
                title={ response.title }
                thumbnail={ response.thumbnail }
                price={ response.price }
              />))
            : <span>Nenhum produto foi encontrado</span> }
        </main>
      </div>
    );
  }
}

export default Home;
