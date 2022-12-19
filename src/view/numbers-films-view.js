import AbstractView from '../framework/view/abstract-view.js';

const createFooterTemplate = (filmCount) => `<p>${filmCount} movies inside</p>`;

export default class NumbersFilmsView extends AbstractView {
  #filmCount = null;
  constructor(filmCount) {
    super();
    this.#filmCount = filmCount;
  }

  get template() {
    return createFooterTemplate(this.#filmCount);
  }
}
