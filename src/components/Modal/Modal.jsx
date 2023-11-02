import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div onClick={handleOverlayClick} className={css.overlay}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={closeModal}>
          &times;
        </button>
        <img className={css.largeImg} src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
