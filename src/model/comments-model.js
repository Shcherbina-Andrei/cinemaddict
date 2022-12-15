import Observable from '../../../1845009-big-trip-simple-18/src/framework/observable.js';


export default class CommentsModel extends Observable {
  #comments = null;
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    try {
      const comments = await this.#commentsApiService.getCurrentComments(film.id);
      this.#comments = comments.map(this.#adaptCommentToClient);
    } catch {
      this.#comments = [];
    }
  };

  updateComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\t update unexciting comment');
    }

    this.#comments = [...this.#comments.slice(0, index), update, ...this.#comments.slice(index + 1)];

    this._notify(updateType, update);
  };

  addComment = async (updateType, update, film) => {
    try {
      const response = await this.#commentsApiService.addComment(update, film.id);
      const newComments = response.comments.map(this.#adaptCommentToClient);
      this.#comments = newComments;
      this._notify(updateType, film);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, update, film) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexciting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
      this._notify(updateType, film);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptCommentToClient = (comment) => {
    const commentItem = {...comment};
    delete commentItem.id;
    const adaptedComment = {...comment, commentItem};
    delete adaptedComment.author;
    delete adaptedComment.date;
    delete adaptedComment.emotion;
    delete adaptedComment.comment;

    return adaptedComment;
  };
}
