import {render} from '../render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';

export default class FilmsBoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();
  filmsContainerComponent = new FilmsContainerView();

  init = (boardContainer, filmsModel, commentsModel) => {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
    this.boardFilms = [...filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    this.boardComments = [...commentsModel.getComments()];

    render(this.filmsBoardComponent, this.boardContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());
    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView(this.boardFilms[i]), this.filmsContainerComponent.getElement());
    }
    render(new ButtonShowMoreView(), this.filmsListComponent.getElement());
    render(new FilmPopupView(this.boardFilms[1], this.commentsModel.getCurrentComments(this.boardFilms[1])), this.boardContainer);
  };
}
