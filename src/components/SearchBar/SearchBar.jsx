import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchQuery: '', // Зберігає значення введеного пошукового запиту
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const searchQuery = this.state.searchQuery.trim();

    if (!searchQuery) {
      return Notify.warning('Please, fill the main field');
    }

    this.props.onSubmitForm(searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={searchQuery}
          />
          <button type="submit">
            <span className={css.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
