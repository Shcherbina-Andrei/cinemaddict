import {createElement} from '../render.js';

const createFilmsContainerElement = () => '<div class="films-list__container"></div>';

export default class FilmsContainerView {
  #element = null;

  get template() {
    return createFilmsContainerElement();
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
