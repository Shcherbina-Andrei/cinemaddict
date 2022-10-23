import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters) => {
  const filtersList = filters.map((filter) => `
  <a href="#${filter.name}" class="main-navigation__item ${filter.name === 'All movies' ? 'main-navigation__item--active' : ''}">${filter.name}
  ${filter.name !== 'All movies' ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}</a>`).
    join('');
  return (
    `<nav class="main-navigation">
       ${filtersList}
     </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
