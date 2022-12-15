
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {formatDateToYear} from '../utils.js';
import {formatDuration} from '../utils.js';

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments} = film;
  const {userDetails} = filmInfo;

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formatDateToYear(filmInfo.release.date)}</span>
          <span class="film-card__duration">${formatDuration(dayjs.duration(filmInfo.runtime, 'm').toISOString())}</span>
          <span class="film-card__genre">${filmInfo.genre[0]}</span>
        </p>
        <img src="${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description.length >= 140 ? `${filmInfo.description.substr(0 ,139) }...` : filmInfo.description}</p>
        <span class="film-card__comments">${comments ? comments.length : '0'} ${comments.length === 1 ? 'comment' : 'comments'}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist
          ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched
          ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite
          ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;


  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setWatchlistHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickWatchlistHandler);
  };

  shakeControls = () => {
    const controlsElement = this.element.querySelector('.film-card__controls');
    this.shakeAbsolute.call({element: controlsElement});
  };


  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setWatchedHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickSetWatchedHandler);
  };

  #clickSetWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setFavoriteHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
