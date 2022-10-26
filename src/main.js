import ProfileRankView from './view/profile-rank-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmsBoardPresenter from './presenter/films-board-presenter.js';
import NumbersFilmsView from './view/numbers-films-view.js';
import {render} from './framework/render.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import {generateFilters} from './mock/filter.js';

const siteHeaderElement = document.querySelector('.header');
const mainBoardElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const siteStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);

const filters = generateFilters(filmsModel.films);

const filmsBoardPresenter = new FilmsBoardPresenter(mainBoardElement, filmsModel, commentsModel);

render(new ProfileRankView(), siteHeaderElement);
render(new FilterView(filters), mainBoardElement);
render(new SortView(), mainBoardElement);
render(new NumbersFilmsView(), siteStatisticsElement);
filmsBoardPresenter.init();
