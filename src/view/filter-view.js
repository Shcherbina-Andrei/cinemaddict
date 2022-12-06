import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters, currentFilter) => {
  const filtersList = filters.map((filter) => `
  <a href="#${filter.name}" class="main-navigation__item ${filter.type === currentFilter ? 'main-navigation__item--active' : ''}" data-filter-value=${filter.type}>${filter.name}
  ${filter.name !== 'All' ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}</a>`).
    join('');
  return (
    `<nav class="main-navigation">
       ${filtersList}
     </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    const filterItems = this.element.querySelectorAll('.main-navigation__item');
    filterItems.forEach((filterItem) => filterItem.addEventListener('click', this.#filterTypeChangeHandler));
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this._callback.filterTypeChange(evt.target.dataset.filterValue);
    }
  };
}
