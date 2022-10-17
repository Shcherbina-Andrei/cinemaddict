import {generateComments} from '../mock/comments.js';

export default class CommentsModel {
  constructor(filmsModel) {
    this.films = filmsModel.getFilms();
    this.comments = generateComments(this.films);
  }

  getComments = () => this.comments;

  getCurrentComments = (film) => film.comments.map((id) => this.comments.find((comment) => comment.id === id));
}
