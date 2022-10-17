import {generateFilms} from '../mock/movie.js';

export default class FilmsModel {
  films = generateFilms(10);

  getFilms = () => this.films;
}
