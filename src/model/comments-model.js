import Observable from '../../../1845009-big-trip-simple-18/src/framework/observable.js';
import {generateComments} from '../mock/comments.js';

export default class CommentsModel extends Observable {
  #comments = null;

  constructor(filmsModel) {
    super();
    this.films = filmsModel.films;
    this.#comments = generateComments(this.films);
  }

  get comments() {
    return this.#comments;
  }

  updateComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\t update unexciting comment');
    }

    this.#comments = [...this.#comments.slice(0, index), update, ...this.#comments.slice(index + 1)];

    this._notify(updateType, update);
  };

  addComment = (updateType, update) => {
    this.#comments = [update, ...this.#comments];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexciting comment');
    }

    this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
    this._notify(updateType, update);
  };

  getCurrentComments = (film) => film.comments.map((id) => this.#comments.find((comment) => comment.id === id));
}
