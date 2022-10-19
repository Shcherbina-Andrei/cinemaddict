import {render} from '../render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';

export default class FilmsBoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();

  #boardFilms = [];
  #boardComments = [];

  init = (boardContainer, filmsModel, commentsModel) => {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#boardFilms = [...filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#boardComments = [...commentsModel.comments];

    render(this.#filmsBoardComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);
    for (let i = 0; i < this.#boardFilms.length; i++) {
      this.#renderCard(this.#boardFilms[i]);
    }
    render(new ButtonShowMoreView(), this.#filmsListComponent.element);
  };

  #renderCard = (film) => {
    const comments = this.#commentsModel.getCurrentComments(film);

    const filmComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmPopupView(film, comments);

    const openPopup = () => {
      this.#boardContainer.appendChild(filmPopupComponent.element);
    };

    const closePopup = () => {
      this.#boardContainer.removeChild(filmPopupComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
      document.querySelector('body').classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
      document.querySelector('body').classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmsContainerComponent.element);
  };
}
