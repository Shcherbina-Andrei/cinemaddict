import {remove, render} from '../framework/render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import NoFilmsView from '../view/no-films-views.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';

const FILM_COUNT_PER_STEP = 10;

export default class FilmsBoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #buttonShowMoreComponent = new ButtonShowMoreView();
  #noFilmsComponent = new NoFilmsView();

  #boardFilms = [];
  #boardComments = [];
  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  #filmPresenter = new Map();

  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#commentsModel.comments];
    this.#renderBoardFilms();
  };

  #handleLoadMoreButtonClick = () => {
    this.#boardFilms.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderCard(film));
    this.#renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmsCount >= this.#boardFilms.length) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.removeElement();
    }
  };

  #renderCard = (film) => {
    const comments = this.#commentsModel.getCurrentComments(film);
    const filmPresenter = new FilmPresenter(this.#filmsContainerComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film, comments);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#boardFilms.slice(from, to).forEach((film) => this.#renderCard(film));
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    const comments = this.#commentsModel.getCurrentComments(updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm, comments);
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  };

  #renderLoadMoreButton = () => {
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  #renderFilmsList = () => {
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
  };

  #renderFilmsContainer = () => {
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);
    this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));

    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#boardContainer.element);
  };

  #renderBoardFilms = () => {
    render(this.#filmsBoardComponent, this.#boardContainer);
    if (this.#boardFilms.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsContainer();
  };
}
