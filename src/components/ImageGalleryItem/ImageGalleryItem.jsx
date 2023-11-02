import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  image: {
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    largeImageURL,
  },
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    modalData(null);
  };

  return (
    <>
      <li className={css.photoCard} onClick={openModal}>
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
          closeModal={closeModal}
          modalData={modalData}
        />
      )}
    </>
  );
};
