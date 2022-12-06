import {render, replace, remove} from '../framework/render';
import FilterView from '../view/filter-view';
import {filter} from '../utils/filter';
import {FilterTypes, UpdateType} from '../const';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterTypes.ALLMOVIES,
        name: 'All',
        count: filter[FilterTypes.ALLMOVIES](films).length,
      },

      {
        type: FilterTypes.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterTypes.WATCHLIST](films).length,
      },

      {
        type: FilterTypes.FAVORITES,
        name: 'Favorites',
        count: filter[FilterTypes.FAVORITES](films).length,
      },

      {
        type: FilterTypes.HISTORY,
        name: 'History',
        count: filter[FilterTypes.HISTORY](films).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

