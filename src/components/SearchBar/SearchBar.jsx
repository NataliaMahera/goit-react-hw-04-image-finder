import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmitForm }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newSearchQuery = searchQuery.trim();

    if (!newSearchQuery) {
      return Notify.warning('Please, fill the main field');
    }

    onSubmitForm(newSearchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />
        <button type="submit">
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};
