import {render, replace, remove} from '../framework/render.js';
import FilmPopupView from '../view/film-popup-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class FilmPopupPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null;

  #setPopupPosition = null;

  #filmPopupComponent = null;

  #film = null;
  #comments = null;

  #changeModeToDefault = null;

  constructor (filmListContainer, changeData, changeModeToDefault, setPopupPosition) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#setPopupPosition = setPopupPosition;
    this.#changeModeToDefault = changeModeToDefault;
  }

  init = (film, comments, scrollPosition = 0) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmPopupComponent = new FilmPopupView(this.#film, this.#comments, scrollPosition);
    this.#filmListContainer.appendChild(this.#filmPopupComponent.element);

    this.#filmPopupComponent.setClickHandler(this.#handleClosePopup);
    this.#filmPopupComponent.setWatchlistHandler(this.#handleWatchlist);
    this.#filmPopupComponent.setWatchedHandler(this.#handleWatched);
    this.#filmPopupComponent.setFavoriteHandler(this.#handleFavorite);
    this.#filmPopupComponent.setAddCommentFormHandler(this.#handleCommentAdd);
    this.#filmPopupComponent.setDeleteCommentHandler(this.#handleCommentDelete);
    this.#filmPopupComponent.setScrollChangeHandler(this.#handleScrollPosition);

    document.body.classList.add('hide-overflow');

    if (prevFilmPopupComponent === null) {
      render(this.#filmPopupComponent, this.#filmListContainer);
      this.#filmPopupComponent.scrollThisElement();
      return;
    }

    replace(this.#filmPopupComponent, prevFilmPopupComponent);
    this.#filmPopupComponent.scrollThisElement();

    remove(prevFilmPopupComponent);
  };

  destroy = () => {
    remove(this.#filmPopupComponent);
  };

  #handleScrollPosition = (scrollPosition) => {
    this.#setPopupPosition(scrollPosition);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  closePopup = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmListContainer.removeChild(this.#filmPopupComponent.element);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeModeToDefault();
  };

  setSaving = () => {
    this.#filmPopupComponent.updateElement({
      isDisabled: true
    });
    this.#filmPopupComponent.scrollThisElement();
  };

  setDeleting = (update) => {
    this.#filmPopupComponent.updateElement({
      deletingCommentId: update.id,
    });
    this.#filmPopupComponent.scrollThisElement();
  };

  setAbortingControls = () => {
    this.#filmPopupComponent.shakeControls();
  };

  setAbortingDeletingComment = (comment) => {
    this.#filmPopupComponent.shakeDeletingComment(comment);
    this.#filmPopupComponent.scrollThisElement();
  };

  setAbortingCommentForm = () => {
    this.#filmPopupComponent.shakeCommentForm();
    this.#filmPopupComponent.scrollThisElement();
  };

  #handleClosePopup = () => {
    this.closePopup();
    document.querySelector('body').classList.remove('hide-overflow');
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
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, {...this.#film, filmInfo: changedFilmInfo}, this.#comments);
  };

  #handleCommentAdd = (update) => {
    const newComment = {};
    newComment.commentItem = update;
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, this.#film, newComment);
  };

  #handleCommentDelete = (update) => {
    const filmsComments = this.#film.comments.filter((comment) => comment.toString() !== update.id);
    this.#changeData(UserAction.REMOVE_COMMENT, UpdateType.MINOR, {...this.#film, comments: filmsComments}, update);
  };
}
