import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.getCategoriesList = this.getCategoriesList.bind(this);

    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  async getCategoriesList() {
    const list = await getCategories();
    this.setState({ categoriesList: list });
  }

  render() {
    const { categoriesList } = this.state;
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
            src="https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png"
            alt="cart"
          />
        </Link>
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <section>
          <ul>
            { categoriesList
              .map((categories) => (
                <li data-testid="category" key={ categories.id }>{ categories.name }</li>
              )) }
          </ul>
        </section>
      </div>
    );
  }
}
export default Home;
