// ЗАДАНИЕ - создать 25 объектов, после чего собрать их в массив, каждый объект состоит из 5 ключей

import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';
import { DESCRIPTIONS, NAMES, COMMENT_MESSAGES } from './data.js';

const PICTURE_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const AVATAR_COUNT = 6;
const MAX_COMMENT_COUNT = 20;
const MIN_STRING_IN_COMMENTS = 1;
const MAX_STRING_IN_COMMENTS = 2;

const generateCommentId = createIdGenerator();
const generatePictureId = createIdGenerator();
const generateUrlId = createIdGenerator();

// добавляет случайные комментарии (создает массив)

const createMessage = () => Array.from(
  {length: getRandomInteger(MIN_STRING_IN_COMMENTS, MAX_STRING_IN_COMMENTS)}, () => getRandomArrayElement(COMMENT_MESSAGES)).join(' ');

// создает объект с описанием комментария

const createComments = () => ({
  commentId: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

// создает объект с описанием фотографии

const createPicture = () => ({
  id: generatePictureId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from ({length: getRandomInteger(0, MAX_COMMENT_COUNT - 1)}, createComments), // создает массив подобных комментариев
});

const getPictures = (count) => Array.from({length: count}, createPicture);

export { getPictures, PICTURE_COUNT };
