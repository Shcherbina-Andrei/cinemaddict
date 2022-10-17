import {getRandomInteger} from '../utils.js';
import {getRandomArrayElement} from '../utils.js';

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const titles = ['Berserk', 'The Dark Knight', 'Inception', 'Nightmare', 'Day of the dead', 'Sunshine', 'Avengers', 'The Lord of the Rings'];

const alternativeTitles = ['Dark shadow', 'Deadly finger', 'Pretty death', 'Fast and Dead', 'Lovely day'];

const directors = ['Sam Raimi', 'Paul Thomas Anderson', 'Ridley Scott', 'Quentin Tarantino', 'Zak Snyder', 'Ethan Coen and Joel Coen'];

const writers = ['Quentin Tarantino', 'Ethan Coen and Joel Coen', 'Paul Schrader', 'Oliver Stone' ,'Aaron Sorkin'];

const actors = ['Mary Elizabeth Winsted', 'Uma Thurman', 'Ben Affleck', 'Michael Kiton', 'Sean Connery', 'Michael Duglas'];

const genres = ['Action', 'Horror', 'Thriller', 'Drama', 'Comedy', 'Adventure'];

const releaseCountry = ['USA', 'France', 'Italy', 'Japan', 'German'];

const commentsAuthors = ['John', 'Alice', 'Mark', 'Jake', 'Howard', 'Michel', 'Anne', 'Cesar'];

const comments = ['Well done', 'Not bad', 'Prefect', 'Great job', 'Excellent', 'Good work'];

const getComment = () => getRandomArrayElement(comments);

const getCommentAuthor = () => getRandomArrayElement(commentsAuthors);

const getEmotion = () => getRandomArrayElement(emotions);

const getTitle = () => getRandomArrayElement(titles);

const getAlternativeTitle = () => getRandomArrayElement(alternativeTitles);

const getDirector = () => getRandomArrayElement(directors);

const getActors = () => {
  const actorsFilm = [];
  const number = getRandomInteger(2, 4);
  for (let i = 0; i < number; i++) {
    let actor = getRandomArrayElement(actors);
    while(actorsFilm.includes(actor)) {
      actor = getRandomArrayElement(actors);
    }
    actorsFilm[i] = actor;
  }

  return actorsFilm;
};

const getWriters = () => {
  const writersFilm = [];
  const number = getRandomInteger(1, 2);

  for (let i = 0; i < number; i++) {
    let writer = getRandomArrayElement(writers);
    while (writersFilm.includes(writer)) {
      writer = getRandomArrayElement(writers);
    }

    writersFilm[i] = writer;
  }

  return writersFilm;
};

const getGenre = () => {
  const genresFilm = [];
  const number = getRandomInteger(1, 3);

  for (let i = 0; i < number; i++) {
    let genre = getRandomArrayElement(genres);
    while(genresFilm.includes(genre)) {
      genre = getRandomArrayElement(genres);
    }

    genresFilm[i] = genre;
  }

  return genresFilm;
};

const getReleaseCountry = () => getRandomArrayElement(releaseCountry);

const getDescription = () => {
  const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus'];

  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};

const posters = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg'];

const getPoster = () => getRandomArrayElement(posters);

export {getComment, getCommentAuthor, getEmotion, getTitle, getAlternativeTitle, getDirector, getActors, getGenre, getWriters, getReleaseCountry, getDescription, getPoster};
