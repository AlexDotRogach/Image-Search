import { PIXABAY } from './const';

const fetchImages = async searchQuery => {
  const { baseUrl, key } = PIXABAY;
  const request = await fetch(`${baseUrl}?key=${key}&q=${searchQuery}`);

  return request.ok ? await request.json() : console.log('no request');
};

export default fetchImages;
