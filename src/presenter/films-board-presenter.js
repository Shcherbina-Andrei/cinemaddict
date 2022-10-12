import {render} from '../render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';

export default class FilmsBoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.filmsBoardComponent, this.boardContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListComponent.getElement());
    }
    render(new ButtonShowMoreView(), this.filmsListComponent.getElement());
  };
}
