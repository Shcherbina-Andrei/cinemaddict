import {generateComments} from '../mock/comments.js';

export default class CommentsModel {
  #comments = null;

  constructor(filmsModel) {
    this.films = filmsModel.films;
    this.#comments = generateComments(this.films);
  }

  get comments() {
    return this.#comments;
  }

  getCurrentComments = (film) => film.comments.map((id) => this.#comments.find((comment) => comment.id === id));
}
