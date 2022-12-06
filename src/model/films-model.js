import Observable from '../../../1845009-big-trip-simple-18/src/framework/observable.js';
import {generateFilms} from '../mock/movie.js';

export default class FilmsModel extends Observable {
  #films = generateFilms(40);

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error ('Can\'t update unexciting film');
    }

    this.#films = [...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)];

    this._notify(updateType, update);
  };
}

