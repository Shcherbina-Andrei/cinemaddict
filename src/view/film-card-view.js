import {createElement} from '../render.js';
import {formatDateToYear} from '../utils.js';
import {formatDuration} from '../utils.js';

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments} = film;

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formatDateToYear(filmInfo.release.date)}</span>
          <span class="film-card__duration">${formatDuration(filmInfo.runtime)}m</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src="${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description.length >= 140 ? `${filmInfo.description.substr(0 ,139) }...` : filmInfo.description}</p>
        <span class="film-card__comments">${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
