import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomNumber} from '../utils.js';
import {getTitle, getAlternativeTitle, getDirector, getActors, getGenre, getWriters, getReleaseCountry, getDescription, getPoster} from './const.js';
dayjs.extend(duration);

const generateFilmInfo = () => ({
  title: getTitle(),
  alternativeTitle: getAlternativeTitle(),
  totalRating: (getRandomNumber(2, 9)),
  poster: getPoster(),
  ageRating: getRandomInteger(6, 18),
  director: getDirector(),
  writers: getWriters(),
  actors: getActors(),
  release: {
    date: dayjs().subtract(getRandomInteger(1, 40), 'year').toISOString(),
    releaseCountry: getReleaseCountry(),
  },
  runtime: dayjs.duration(100, 'm').toISOString(),
  genre: getGenre(),
  description: getDescription(),
  userDetails: {
    watchlist: Boolean(getRandomInteger(0 ,1)),
    alreadyWatched: Boolean(getRandomInteger(0 ,1)),
    watchingDate: dayjs().subtract(getRandomInteger(1, 30), 'day').toISOString(),
    favorite: Boolean(getRandomInteger(0 ,1))
  }
});

const generateFilms = (filmsCount) => {
  const films = Array.from({length: filmsCount}, generateFilmInfo);

  let totalCommentsCount = 0;

  return films.map((film) => {
    const hasFilmComments = getRandomInteger(0, 1);
    const filmsCommentsCount = (hasFilmComments) ? getRandomInteger(1, 5) : 0;
    totalCommentsCount += filmsCommentsCount;

    return {
      id: nanoid(),
      comments: (hasFilmComments) ? Array.from({length: filmsCommentsCount},(_value, commentIndex) => String(totalCommentsCount - commentIndex)) : [],
      filmInfo: film
    };
  });
};

export {generateFilms};
