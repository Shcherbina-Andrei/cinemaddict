const FilterTypes = {
  ALLMOVIES: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

const SortTypes = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const EmojiTypes = ['smile', 'sleeping', 'puke', 'angry'];

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export {FilterTypes, SortTypes, EmojiTypes, UserAction, UpdateType};
