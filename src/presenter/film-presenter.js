import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';

const Mode = {
  DEFAULT : 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmComponent = null;
  #filmPopupComponent = null;

  #film = null;
  #comments = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film, comments) => {
    this.#film = film;


    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;


    this.#comments = comments;
    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmPopupComponent = new FilmPopupView(this.#film, this.#comments);

    this.#filmComponent.setClickHandler(this.#handleOpenPopup);
    this.#filmComponent.setWatchlistHandler(this.#handleWatchlist);
    this.#filmComponent.setWatchedHandler(this.#handleWatched);
    this.#filmComponent.setFavoriteHandler(this.#handleFavorite);

    this.#filmPopupComponent.setClickHandler(this.#handleClosePopup);
    this.#filmPopupComponent.setWatchlistHandler(this.#handleWatchlist);
    this.#filmPopupComponent.setWatchedHandler(this.#handleWatched);
    this.#filmPopupComponent.setFavoriteHandler(this.#handleFavorite);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    replace(this.#filmComponent, prevFilmComponent);

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  };

  #openPopup = () => {
    this.#filmListContainer.appendChild(this.#filmPopupComponent.element);
    this.#changeMode();
    this.#mode = Mode.POPUP;
  };

  #closePopup = () => {
    this.#filmListContainer.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleOpenPopup = () => {
    this.#openPopup();
    document.querySelector('body').classList.add('hide-overflow');
  };

  #handleClosePopup = () => {
    this.#closePopup();
    document.querySelector('body').classList.remove('hide-overflow');
  };

  #handleWatchlist = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, watchlist: !this.#film.filmInfo.userDetails.watchlist};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData({...this.#film, filmInfo: changedFilmInfo});
  };

  #handleWatched = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData({...this.#film, filmInfo: changedFilmInfo});
  };

  #handleFavorite = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, favorite: !this.#film.filmInfo.userDetails.favorite};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData({...this.#film, filmInfo: changedFilmInfo});
  };
}
