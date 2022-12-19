import AbstractView from '../framework/view/abstract-view';

const createTopFilmsTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
     </section>`
);

export default class FilmsTopView extends AbstractView {
  get template() {
    return createTopFilmsTemplate();
  }
}
