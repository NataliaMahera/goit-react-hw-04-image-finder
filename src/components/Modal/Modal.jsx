import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags, closeModal } = this.props;
    return (
      <div onClick={this.handleOverlayClick} className={css.overlay}>
        <div className={css.modal}>
          <button type="button" className={css.closeBtn} onClick={closeModal}>
            &times;
          </button>
          <img className={css.largeImg} src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
