import ProfileRankView from './view/profile-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmsBoardPresenter from './presenter/films-board-presenter.js';
import { render } from './render';

const siteHeaderElement = document.querySelector('.header');
const mainBoardElement = document.querySelector('.main');
const filmsBoardPresenter = new FilmsBoardPresenter();

render(new ProfileRankView(), siteHeaderElement);
render(new FilterView(), mainBoardElement);
render(new SortView(), mainBoardElement);

filmsBoardPresenter.init(mainBoardElement);
