import Observable from '../framework/observable';
import {FilterTypes} from '../const';

export default class FilterModel extends Observable {
  #filter = FilterTypes.ALLMOVIES;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
