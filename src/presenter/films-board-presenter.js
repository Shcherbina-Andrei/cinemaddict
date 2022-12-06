import {remove, RenderPosition, render} from '../framework/render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import NoFilmsView from '../view/no-films-views.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import FilmPopupPresenter from './film-popup-presenter.js';
import {sortByDate, sortByRating} from '../utils.js';
import {SortTypes, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';

const Mode = {
  DEFAULT : 'DEFAULT',
  POPUP: 'POPUP'
};

const FILM_COUNT_PER_STEP = 10;

export default class FilmsBoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #mode = Mode.DEFAULT;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #sortComponent = null;
  #buttonShowMoreComponent = null;
  #noFilmsComponent = null;

  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  #filmPresenter = new Map();
  #filmPopupPresenter = null;
  #currentOpenedFilm = null;
  #currentSortType = SortTypes.DEFAULT;
  #filterType = null;

  #filmsDefault = null;

  #scrollPopupPosition = 0;

  constructor(boardContainer, filmsModel, commentsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#filmsDefault = this.#filmsModel.films;
    this.#filmsModel.addObserver(this.#handleFilmModelEvent);
    this.#filterModel.addObserver(this.#handleFilmModelEvent);
  }

  init = () => {
    this.#renderBoardFilms();
  };

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = [...this.#filmsModel.films];
    const filteredFilms = filter[this.#filterType](films);

    switch(this.#currentSortType) {
      case SortTypes.DATE:
        return filteredFilms.sort(sortByDate);
      case SortTypes.RATING:
        return filteredFilms.sort(sortByRating);
      case SortTypes.DEFAULT:
        return filteredFilms;
    }

    return filteredFilms;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  #openPopup = (film) => {
    if (this.#mode === Mode.POPUP) {
      this.#filmPopupPresenter.closePopup();
    }
    this.#filmPopupPresenter = new FilmPopupPresenter(this.#filmsContainerComponent.element, this.#handleViewAction, this.#changeModeToDefault, this.#setPopupScroll);
    this.#filmPopupPresenter.init(film, this.#commentsModel.getCurrentComments(film));
    this.#currentOpenedFilm = film;
    this.#mode = Mode.POPUP;
  };

  #setPopupScroll = (scrollPosition) => {
    this.#scrollPopupPosition = scrollPosition;
  };

  #changeModeToDefault = () => {
    this.#mode = Mode.DEFAULT;
  };

  #handleLoadMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmCount);
    this.#renderFilms(films);
    this.#renderedFilmsCount = newRenderedFilmCount;
    if (this.#renderedFilmsCount >= filmCount) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.removeElement();
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#filmsBoardComponent.element, RenderPosition.BEFOREBEGIN);
  };

  #renderCard = (film) => {
    const comments = this.#commentsModel.getCurrentComments(film);
    const filmPresenter = new FilmPresenter(this.#filmsContainerComponent.element, this.#handleViewAction, this.#handleModeChange, this.#openPopup);
    filmPresenter.init(film, comments);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderCard(film));
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, updateComment);
        this.#filmsModel.updateFilm(updateType, updateFilm);
        break;
      case UserAction.REMOVE_COMMENT:
        this.#filmsModel.updateFilm(updateType, updateFilm);
        this.#commentsModel.deleteComment(updateType, updateComment);
        break;
    }
  };

  #handleFilmModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data, this.#commentsModel.getCurrentComments(data));
        if (this.#mode === Mode.POPUP) {
          const currentUpdatedFilm = this.#filmsModel.films.find((film) => film.id === this.#currentOpenedFilm.id);
          this.#filmPopupPresenter.init(currentUpdatedFilm, this.#commentsModel.getCurrentComments(currentUpdatedFilm), this.#scrollPopupPosition);
        }
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoardFilms();
        if (this.#mode === Mode.POPUP) {
          this.#filmPopupPresenter = new FilmPopupPresenter(this.#filmsContainerComponent.element, this.#handleViewAction, this.#changeModeToDefault, this.#setPopupScroll);
          const currentUpdatedFilm = this.#filmsModel.films.find((film) => film.id === this.#currentOpenedFilm.id);
          this.#filmPopupPresenter.init(currentUpdatedFilm, this.#commentsModel.getCurrentComments(currentUpdatedFilm), this.#scrollPopupPosition);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderBoardFilms();
        if (this.#mode === Mode.POPUP) {
          this.#filmPopupPresenter = new FilmPopupPresenter(this.#filmsContainerComponent.element, this.#handleViewAction, this.#handleModeChange, this.#changeModeToDefault, this.#setPopupScroll);
          const currentUpdatedFilm = this.#filmsModel.films.find((film) => film.id === this.#currentOpenedFilm.id);
          this.#filmPopupPresenter.init(currentUpdatedFilm, this.#commentsModel.getCurrentComments(currentUpdatedFilm), this.#scrollPopupPosition);
        }
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoardFilms();
  };

  #renderLoadMoreButton = () => {
    this.#buttonShowMoreComponent = new ButtonShowMoreView();
    this.#buttonShowMoreComponent.setClickHandler(this.#handleLoadMoreButtonClick);
    render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);
  };

  #renderFilmsList = () => {
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filterType);
    render(this.#noFilmsComponent, this.#boardContainer);
  };

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    if (this.#filmPopupPresenter) {
      this.#filmPopupPresenter.destroy();
    }
    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#buttonShowMoreComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmsCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }

  };

  #renderBoardFilms = () => {
    const films = this.films;
    const filmsCount = films.length;

    render(this.#filmsBoardComponent, this.#boardContainer);

    if (filmsCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmsList();
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);
    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmsCount)));

    if (filmsCount > FILM_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  };
}
