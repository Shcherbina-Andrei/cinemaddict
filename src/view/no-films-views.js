import AbstractView from '../framework/view/abstract-view.js';

const createNoFilmsTemplate = (filterType) => {
  let currentText;
  switch (filterType) {
    case 'All':
      currentText = 'There are no movies in our database';
      break;
    case 'Watchlist':
      currentText = 'There are no movies to watch now';
      break;
    case 'History':
      currentText = 'There are no watched movies now';
      break;
    case 'Favorites':
      currentText = 'There are no favorite movies now';
      break;
  }
  return (
    `<h2 class="films-list__title">${currentText}</h2>`
  );};

export default class NoFilmsView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoFilmsTemplate(this.#filterType);
  }
}
