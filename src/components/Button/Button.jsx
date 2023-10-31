import css from './Button.module.css';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
};
