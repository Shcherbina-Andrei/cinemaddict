import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

const getRandomInteger = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const number = lower + Math.random() * (upper - lower + 1);

  return number.toFixed(1);
};


const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const formatDateToYear = (dueDate) => dayjs(dueDate).format('YYYY');

const formatSlashDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');

const formatFullDate = (dueDate) => dayjs(dueDate).format('DD MMMM YYYY');

const formatDuration = (dueDuration) => dayjs.duration(dueDuration).format('H[h] m[m]');

const getWeightForSort = (pointA, pointB) => {
  if (pointA === null && pointB === null) {
    return 0;
  }

  if (pointA === null) {
    return 1;
  }

  if (pointB === null) {
    return -1;
  }
};

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForSort(filmA.filmInfo.release.date, filmB.filmInfo.release.date);
  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortByRating = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }

  if (filmA.filmInfo.totalRating === filmB.filmInfo.totalRating) {
    return 0;
  }

  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }
};

const sortByComments = (filmA, filmB) => {
  if (filmA.comments.length < filmB.comments.length) {
    return 1;
  }

  if (filmA.comments.length === filmB.comments.length) {
    return 0;
  }

  if (filmA.comments.length > filmB.comments.length) {
    return -1;
  }
};


export {getRandomInteger, getRandomNumber, getRandomArrayElement, formatDateToYear, formatSlashDate, formatFullDate, formatDuration, sortByDate, sortByRating, sortByComments};
