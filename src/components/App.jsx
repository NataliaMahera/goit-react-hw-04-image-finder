import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { SearchBar } from './SearchBar/SearchBar';
import { getImages } from './services/pixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.addImagesOnSubmit();
    }
  }

  handleImageSearch = searchQuery => {
    this.setState({ query: searchQuery, page: 1, images: [] });
  };

  addImagesOnSubmit = async () => {
    try {
      this.setState({ isLoading: true });

      const { query, page } = this.state;

      const { hits, totalHits } = await getImages(query, page);

      if (totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prev => ({
        images: [...prev.images, ...hits],
        totalPages: Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
      Notify.failure('Oops, something went wrong!');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, totalPages, page } = this.state;
    return (
      <>
        <SearchBar onSubmitForm={this.handleImageSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && (
          <LoadMoreBtn onClick={this.onLoadMore} />
        )}
      </>
    );
  }
}
