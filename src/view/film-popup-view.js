import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatFullDate} from '../utils.js';
import {formatSlashDate} from '../utils.js';
import {formatDuration} from '../utils.js';
import {EmojiTypes} from '../const.js';
import dayjs from 'dayjs';
import he from 'he';

const COMMENT_BLANK = {
  comment: '',
  emotion: ''
};

const createGenreListTemplate = (genres) => {
  const genresList = genres.map((genre) => `
   <span class="film-details__genre">${genre}</span>`).join('');

  return genresList;
};

const createFilmInfoTemplate = (filmInfo) => `
  <div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

      <p class="film-details__age">${filmInfo.ageRating}+</p>
    </div>

    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${filmInfo.title}</h3>
          <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${filmInfo.totalRating}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${filmInfo.director}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${filmInfo.writers}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${filmInfo.actors}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${formatFullDate(filmInfo.release.date)}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${formatDuration(dayjs.duration(filmInfo.runtime, 'm').toISOString())}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Genres</td>
          <td class="film-details__cell">
            ${createGenreListTemplate(filmInfo.genre)}
        </tr>
      </table>

      <p class="film-details__film-description">
        ${filmInfo.description}
      </p>
    </div>
  </div>`;

const createCommentsListTemplate = (comments, deletingCommentId) => {
  const commentsItems = comments.map((comment) => `
  <li class="film-details__comment" data-comment=${comment.id}>
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.commentItem.emotion}.png" width="55" height="55" alt="emoji-${comment.commentItem.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.commentItem.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.commentItem.author}</span>
        <span class="film-details__comment-day">${formatSlashDate(comment.commentItem.date)}</span>
        <button class="film-details__comment-delete" ${deletingCommentId === comment.id ? 'disabled' : ''} data-id=${comment.id}>${deletingCommentId === comment.id ? 'Deleting' : 'Delete'}</button>
      </p>
    </div>
  </li>`).join('');
  return `
    <ul class="film-details__comments-list">
      ${commentsItems}
    </ul>`;
};

const createCommentFormTemplate = (newComment, isDisabled) => {
  const emojiInputs = EmojiTypes.map((emoji) => (`
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}"
    value=${emoji} ${emoji === newComment.emotion ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>
  `)).join('');
  return (`
     <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label">
          ${newComment.emotion ? `<img src="images/emoji/${newComment.emotion}.png" width="55" height="55" alt="emoji-${newComment.emotion}">` : ''}
        </div
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>${he.encode(newComment.comment) || ''}</textarea>
        </label>
        <div class="film-details__emoji-list">
          ${emojiInputs}
        </div>
      </form>
  `);
};

const createCommentsTemplate = (comments, newComment, isDisabled, deletingCommentId) => `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : '0'}</span></h3
      ${comments ? createCommentsListTemplate(comments, deletingCommentId) : ''}
      ${createCommentFormTemplate(newComment, isDisabled)}
    </section>`;

const createFilmPopupTemplate = ({film, comments, newComment, isDisabled, deletingCommentId}) => {
  const {filmInfo} = film;
  const {userDetails} = filmInfo;
  return `
  <section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        ${createFilmInfoTemplate(filmInfo)}
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button
          ${userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button
          ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button
          ${userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
      ${createCommentsTemplate(comments, newComment, isDisabled, deletingCommentId)}
      </div>
    </div>
  </section>`;
};

export default class FilmPopupView extends AbstractStatefulView {

  constructor(film, comments, scrollPosition, deletingCommentId = null) {
    super();
    this._state = this.#parseFilmToState(film, comments, deletingCommentId);
    this._state.scrollPosition = scrollPosition;
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupTemplate(this._state);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #parseFilmToState = (film, comments, deletingCommentId) => ({
    film: film,
    comments: comments,
    newComment: COMMENT_BLANK,
    deletingCommentId: deletingCommentId,
    isDisabled: false,
  });

  scrollThisElement = () => {
    this.element.scrollTo(0, this._state.scrollPosition);
  };

  #parseStateToComments = (state) => {
    let comments = {...state};
    delete comments.film;
    delete comments.newComment;
    delete comments.isDisabled;
    delete comments.deletingCommentId;
    comments = comments.comments;
    return comments;
  };

  #parseStateToNewComments = (state) => {
    const commentText = this.element.querySelector('.film-details__comment-input').value;
    const comment = {...state};
    comment.newComment.comment = commentText;
    delete comment.film;
    delete comment.comments;
    delete comment.isDisabled;
    delete comment.deletingCommentId;
    return comment.newComment;
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #emotionChangeHandler = (evt) => {
    evt.preventDefault();
    const commentText = this.element.querySelector('.film-details__comment-input').value;
    const newComment = {...this._state.newComment, emotion: evt.target.value, comment: commentText};
    this.updateElement({
      newComment: newComment
    });
    this.element.scrollTo(0, this._state.scrollPosition);
  };

  setWatchlistHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click',this.#clickWatchListHandler);
  };

  shakeControls = () => {
    const controlsElement = this.element.querySelector('.film-details__controls');
    this.shake.call({element: controlsElement});
  };

  shakeDeletingComment = (comment) => {
    const commentsElements = this.element.querySelectorAll('.film-details__comment');
    const currentComment = [...commentsElements].find((element) => element.dataset.comment === comment.id);

    this.shake.call({element: currentComment}, this.updateElement({
      deletingCommentId: null
    }));
  };

  shakeCommentForm = () => {
    const commentFormElement = this.element.querySelector('.film-details__new-comment');
    this.shake.call({element: commentFormElement}, this.updateElement({
      isDisabled: false,
      deletingCommentId: null
    }));
  };

  #clickWatchListHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setWatchedHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#clickSetWatchedHandler);
  };

  #clickSetWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setScrollChangeHandler = (scrollHandler) => {
    this._callback.scrollHandler = scrollHandler;
    this.element.addEventListener('scroll', () => {
      this._state.scrollPosition = this.element.scrollTop;
      this._callback.scrollHandler(this._state.scrollPosition);
    });
  };

  setFavoriteHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#clickFavoriteHandler);
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => item.addEventListener('click', this.#emotionChangeHandler));
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setWatchlistHandler(this._callback.watchlistClick);
    this.setWatchedHandler(this._callback.watchedClick);
    this.setFavoriteHandler(this._callback.favoriteClick);
    this.setAddCommentFormHandler(this._callback.addCommentForm);
    this.setScrollChangeHandler(this._callback.scrollHandler);
    this.#setInnerHandlers();
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setAddCommentFormHandler = (callback) => {
    this._callback.addCommentForm = callback;
    this.element.querySelector('.film-details__new-comment').addEventListener('keydown', this.#addCommentFormHandler);
  };

  #addCommentFormHandler = (evt) => {
    if (evt.code === 'Enter' && evt.ctrlKey) {
      const newComment = this.#parseStateToNewComments(this._state);
      this._callback.addCommentForm(newComment);
    }
  };

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((deleteButton) => deleteButton.addEventListener('click', this.#deleteCommentHandler));
  };

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    const currentCommentId = evt.target.dataset.id;
    const currentComment = this.#parseStateToComments(this._state).find((comment) => comment.id === currentCommentId);
    this._callback.deleteComment(currentComment);
  };
}

