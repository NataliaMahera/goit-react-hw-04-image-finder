import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from './services/pixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';

export const App = ({ openModal }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const addImagesOnSubmit = async () => {
      try {
        setIsLoading(true);

        const { hits, totalHits } = await getImages(query, page);

        if (totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalPages(Math.ceil(totalHits / 12));
      } catch {
        setError(error);
        Notify.failure('Oops, something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    addImagesOnSubmit();
  }, [query, page, error]);

  const handleImageSearch = newSearchQuery => {
    setQuery(newSearchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmitForm={handleImageSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== page && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
    </>
  );
};
