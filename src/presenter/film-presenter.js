import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #openPopup = null;

  #filmComponent = null;


  #film = null;

  constructor(filmListContainer, changeData, changeMode, openPopup) {
    this.#openPopup = openPopup;
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(this.#film);

    this.#filmComponent.setClickHandler(() => this.#openPopup(this.#film));
    this.#filmComponent.setWatchlistHandler(this.#handleWatchlist);
    this.#filmComponent.setWatchedHandler(this.#handleWatched);
    this.#filmComponent.setFavoriteHandler(this.#handleFavorite);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    replace(this.#filmComponent, prevFilmComponent);

    remove(prevFilmComponent);
  };

  setAbortingControls = () => {
    this.#filmComponent.shakeControls();
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  #handleWatchlist = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, watchlist: !this.#film.filmInfo.userDetails.watchlist};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {...this.#film, filmInfo: changedFilmInfo});
  };

  #handleWatched = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {...this.#film, filmInfo: changedFilmInfo});
  };

  #handleFavorite = () => {
    const changedUserDetails = {...this.#film.filmInfo.userDetails, favorite: !this.#film.filmInfo.userDetails.favorite};
    const changedFilmInfo = {...this.#film.filmInfo, userDetails: changedUserDetails};
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {...this.#film, filmInfo: changedFilmInfo});
  };
}
