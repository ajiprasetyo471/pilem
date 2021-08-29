import { renderMovies, getError, createVideoDetail } from '../view/main.js';

const API_KEY = '9b6e8f341d58e7535341bb35b8fac16f';
const URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const VIDEO_URL = 'https://www.youtube.com/embed/';

const getUrl = (path) => {
  const url = `${URL}${path}?api_key=${API_KEY}`;
  return url;
};

const getMovies = (url, onSuccess, onFailed) => {
  fetch(url)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onFailed);
};

const getMovieDetails = (id) => {
  const path = `/movie/${id}`;
  const url = getUrl(path);
  return fetch(url)
    .then((response) => response.json())
    .then((m) => m);
};

const searchMovies = (key) => {
  const path = '/search/movie';
  const url = `${getUrl(path)}&query=${key}`;
  const render = renderMovies.bind({
    title: `Result for "${key}"`,
  });
  getMovies(url, render, getError);
};

const getVideos = (movieId, trailer) => {
  const path = `/movie/${movieId}/videos`;
  const url = getUrl(path);
  const render = createVideoDetail.bind({
    trailer,
  });
  getMovies(url, render, getError);
};

const getNowPlayingMovies = () => {
  const path = '/movie/now_playing';
  const url = `${getUrl(path)}`;
  const render = renderMovies.bind({
    title: 'Now Playing Movies',
  });
  getMovies(url, render, getError);
};

const getTopRatedMovies = () => {
  const path = '/movie/top_rated';
  const url = `${getUrl(path)}`;
  const render = renderMovies.bind({
    title: 'Top Rated Movies',
  });
  getMovies(url, render, getError);
};

const getPopularMovies = () => {
  const path = '/movie/popular';
  const url = `${getUrl(path)}`;
  const render = renderMovies.bind({
    title: 'Popular Movies',
  });
  getMovies(url, render, getError);
};

const getTrendingMovies = () => {
  const path = '/trending/movie/day';
  const url = `${getUrl(path)}`;
  const render = renderMovies.bind({
    title: 'Trending Movies',
  });
  getMovies(url, render, getError);
};

export {
  getMovieDetails,
  searchMovies,
  getVideos,
  getNowPlayingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getTrendingMovies,
  IMG_URL,
  VIDEO_URL,
};
