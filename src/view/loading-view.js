import {createElement} from '../render.js';

const createLoadingTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

export default class LoadingView {
  getTemplate() {
    return createLoadingTemplate();
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
