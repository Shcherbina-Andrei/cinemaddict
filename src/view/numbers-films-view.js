import AbstractView from '../framework/view/abstract-view.js';

const createFooterTemplate = () => '<p>130 291 movies inside</p>';

export default class NumbersFilmsView extends AbstractView {
  get template() {
    return createFooterTemplate();
  }
}
