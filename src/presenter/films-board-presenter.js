import {render} from '../render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import NoFilmsView from '../view/no-films-views.js';

const FILM_COUNT_PER_STEP = 10;

export default class FilmsBoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #buttonShowMoreComponent = new ButtonShowMoreView();
  #noFilmsComponent = new NoFilmsView();

  #boardFilms = [];
  #boardComments = [];
  #renderedFilmsCount = FILM_COUNT_PER_STEP;

  constructor(boardContainer, filmsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardComments = [...this.#commentsModel.comments];
    this.#renderBoardFilms();
  };

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#boardFilms.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderCard(film));
    this.#renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmsCount >= this.#boardFilms.length) {
      this.#buttonShowMoreComponent.element.remove();
      this.#buttonShowMoreComponent.deleteElement();
    }
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

  #renderBoardFilms = () => {
    render(this.#filmsBoardComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);
    if (this.#boardFilms.length === 0) {
      render(this.#noFilmsComponent, this.#filmsContainerComponent.element);
    } else {
      for (let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#boardFilms[i]);
      }

      if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#buttonShowMoreComponent, this.#filmsListComponent.element);

        this.#buttonShowMoreComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
      }
    }
  };
}
