import {createElement} from '../render.js';

const createFilmsContainerElement = () => '<div class="films-list__container"></div>';

export default class FilmsContainerView {
  getTemplate() {
    return createFilmsContainerElement();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(createFilmsContainerElement());
    }

    return this.element;
  }

  deleteElement() {
    this.element = null;
  }
}
