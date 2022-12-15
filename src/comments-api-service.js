import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class CommentsApiService extends ApiService {
  getCurrentComments = (id) => this._load({url: `comments/${id}`})
    .then(ApiService.parseResponse);

  addComment = async (comment, id) => {
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (comment) => {
    const adaptedComment = {...comment.commentItem};
    return adaptedComment;
  };
}

