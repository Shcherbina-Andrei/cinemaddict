import {FilterTypes} from '../const.js';

const filter = {
  [FilterTypes.ALLMOVIES]: (films) => films,
  [FilterTypes.WATCHLIST]: (films) => films.filter((film) => film.filmInfo.userDetails.watchlist),
  [FilterTypes.FAVORITES]: (films) => films.filter((film) => film.filmInfo.userDetails.favorite),
  [FilterTypes.HISTORY]: (films) => films.filter((film) => film.filmInfo.userDetails.alreadyWatched)
};

export {filter};
