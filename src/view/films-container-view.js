import AbstractView from '../framework/view/abstract-view.js';

const createFilmsContainerElement = () => '<div class="films-list__container"></div>';

export default class FilmsContainerView extends AbstractView {
  get template() {
    return createFilmsContainerElement();
  }
}
