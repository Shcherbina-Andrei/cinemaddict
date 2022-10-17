import {createElement} from '../render.js';

const createFooterTemplate = () => '<p>130 291 movies inside</p>';

export default class NumbersFilmsView {
  getTemplate() {
    return createFooterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  deleteElement() {
    this.element = null;
  }
}
