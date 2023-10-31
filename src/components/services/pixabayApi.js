import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39378361-84cceb719c73bb4a719068f06';

export const getImages = async (query, page) => {
  const config = {
    params: {
      q: query,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  const { data } = await axios.get(`?key=${API_KEY}`, config);
  return data;
};
