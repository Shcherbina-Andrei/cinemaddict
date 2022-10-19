import {generateFilms} from '../mock/movie.js';

export default class FilmsModel {
  #films = generateFilms(40);

  get films() {
    return this.#films;
  }
}
