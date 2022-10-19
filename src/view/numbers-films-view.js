import {createElement} from '../render.js';

const createFooterTemplate = () => '<p>130 291 movies inside</p>';

export default class NumbersFilmsView {
  #element = null;

  get template() {
    return createFooterTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  deleteElement() {
    this.#element = null;
  }
}
