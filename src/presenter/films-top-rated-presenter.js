import {remove, render} from '../framework/render.js';
import FilmsTopView from '../view/films-top-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmPresenter from './film-presenter.js';
import {sortByRating} from '../utils.js';

export default class FilmsTopRatedPresenter {
  #filmsTopComponent = new FilmsTopView();

  #container = null;
  #filmsContainerComponent = new FilmsContainerView();
  #films = null;
  #filmPresenter = new Map();
  #handleViewAction = null;
  #handleModeChange = null;
  #openPopup = null;
  #filmsModel = null;

  constructor(container, filmsModel, handleViewAction, handleModeChange, openPopup) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#handleViewAction = handleViewAction;
    this.#handleModeChange = handleModeChange;
    this.#openPopup = openPopup;
  }

  init = () => {
    const films = this.#filmsModel.films;
    const zeroRatingFilms = films.filter((film) => film.filmInfo === 0);
    if (zeroRatingFilms.length === films.length) {
      return;
    }
    render(this.#filmsTopComponent, this.#container.element);
    render(this.#filmsContainerComponent, this.#filmsTopComponent.element);
    this.#films = [...films].sort(sortByRating).slice(0, 2);
    this.#renderFilms(this.#films, this.#filmsContainerComponent.element);
  };

  updateCurrentElement = (film) => {
    if (this.#filmPresenter.get(film.id)) {
      this.#filmPresenter.get(film.id).init(film);
    }
  };

  #renderCard = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#handleViewAction, this.#handleModeChange, this.#openPopup);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (films, container) => {
    films.forEach((film) => this.#renderCard(film, container));
  };

  destroy = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    remove(this.#filmsTopComponent);
  };
}
