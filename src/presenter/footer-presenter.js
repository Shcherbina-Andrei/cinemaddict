import {remove, render, replace} from '../framework/render';
import NumbersFilmsView from '../view/numbers-films-view';

export default class FooterPresenter {
  #filmsModel = null;

  #footerComponent = null;
  #footerComponentContainer = null;

  constructor (footerComponentContainer, filmsModel) {
    this.#footerComponentContainer = footerComponentContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.init);
  }

  init = () => {
    const prevFooterComponent = this.#footerComponent;
    const films = [...this.#filmsModel.films];
    this.#footerComponent = new NumbersFilmsView(films.length);
    render(this.#footerComponent, this.#footerComponentContainer);
    if (prevFooterComponent === null) {
      render(this.#footerComponent, this.#footerComponentContainer);
      return;
    }

    replace(this.#footerComponent, prevFooterComponent);
    remove(prevFooterComponent);
  };
}

