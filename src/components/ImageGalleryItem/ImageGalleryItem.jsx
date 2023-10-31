import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    modalData: null, //дані які відображає модалка
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const {
      image: {
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      },
    } = this.props;

    const { isOpenModal, modalData } = this.state;

    return (
      <>
        <li className={css.photoCard} onClick={this.openModal}>
          <img className={css.galleryItemImg} src={webformatURL} alt={tags} />
          <div className={css.info}>
            <p className={css.infoItem}>
              <b>Likes</b>
              {likes}
            </p>
            <p className={css.infoItem}>
              <b>Views</b>
              {views}
            </p>
            <p className={css.infoItem}>
              <b>Comments</b>
              {comments}
            </p>
            <p className={css.infoItem}>
              <b>Downloads</b>
              {downloads}
            </p>
          </div>
        </li>
        {isOpenModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            closeModal={this.closeModal}
            modalData={modalData}
          />
        )}
      </>
    );
  }
}
