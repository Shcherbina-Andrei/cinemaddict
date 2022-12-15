import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedUserDetails = {...film.filmInfo.userDetails,
      'already_watched': film.filmInfo.userDetails.alreadyWatched,
      'watching_date': film.filmInfo.userDetails.watchingDate
    };
    delete adaptedUserDetails.alreadyWatched;
    delete adaptedUserDetails.watchingDate;

    const adaptedRelease = {...film.filmInfo.release,
      ['release_country']: film.filmInfo.release.releaseCountry
    };
    delete adaptedRelease.releaseCountry;

    const adaptedFilmInfo = {...film.filmInfo,
      ['age_rating']: film.filmInfo.ageRating,
      ['alternative_title']: film.filmInfo.alternativeTitle,
      ['total_rating']: film.filmInfo.totalRating,
      release: adaptedRelease
    };
    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.totalRating;
    delete adaptedFilmInfo.userDetails;

    const adaptedFilm = {...film,
      ['film_info']: adaptedFilmInfo,
      ['user_details']: adaptedUserDetails
    };
    delete adaptedFilm.filmInfo;

    return adaptedFilm;
  };
}
