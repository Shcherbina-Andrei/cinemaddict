import ProfileRankView from './view/profile-rank-view.js';
import FilmsBoardPresenter from './presenter/films-board-presenter.js';
import NumbersFilmsView from './view/numbers-films-view.js';
import {render} from './framework/render.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.header');
const mainBoardElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const siteStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filterModel = new FilterModel();

const filmsBoardPresenter = new FilmsBoardPresenter(mainBoardElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainBoardElement, filterModel, filmsModel);

render(new ProfileRankView(), siteHeaderElement);
render(new NumbersFilmsView(), siteStatisticsElement);
filterPresenter.init();
filmsBoardPresenter.init();
