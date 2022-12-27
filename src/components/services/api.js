import { PIXABAY } from './const';

const fetchImages = async (searchQuery, page) => {
  const { baseUrl, key } = PIXABAY;
  const request = await fetch(
    `${baseUrl}?key=${key}&q=${searchQuery}&page=${page}`
  );

  return request.ok ? await request.json() : 'no request';
};

export default fetchImages;
