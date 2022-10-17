import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';
import {getComment, getCommentAuthor, getEmotion} from './const.js';

const generateComment = () => ({
  author: getCommentAuthor(),
  comment: getComment(),
  date: dayjs().subtract(getRandomInteger(1, 30),'day').toISOString(),
  emotion: getEmotion(),
});

const getCommentCount = (films) => films.reduce(
  (count, film) => count + film.comments.length, 0
);

const generateComments = (films) => {
  const commentsCount = getCommentCount(films);

  return Array.from({length: commentsCount}, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      commentItem
    };
  });
};

export {generateComments};
