// ЗАДАНИЕ - создать 25 объектов, после чего собрать их в массив, каждый объект состоит из 5 ключей

const PICTURE_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const DESCRIPTIONS = [
  'Наш санаторий в Сочи #отпуск #отдыхаем',
  'Путь на пляж.. #beach #отдых #море',
  'Незабываемый отдых #maledives #мечта',
  'Устроили фотосессию #фоткаемся #лето',
  'Веселенький обед)))',
  'МОТИВАЦИЯ #машинамечты',
  'Снова диета к лету... #пп #худею',
  'Нужно радовать себя каждый день и исполнять свои мечты <3 #сбывшаясямечта',
  'Купили модные обновочки',
  'Отдохнули с друзьями)))))'
];

// ПОДЗАДАНИЕ - КОММЕНТАРИЙ: МАССИВ С ОБЪЕКТАМИ, каждый объект-комментарий состоит из 4 ключей

const AVATAR_COUNT = 6;
const NAMES = ['Иван', 'Мария', 'Виктор', 'Юлия', 'Игорь', 'Елена'];
const MAX_COMMENT_COUNT = 20;
const MIN_STRING_IN_COMMENTS = 1;
const MAX_STRING_IN_COMMENTS = 2;
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// создает уникальное позитивное рандомное число в указанном диапазоне

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// возвращает случайный элемент массива

const gerRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

// создает функцию-генератор для получения уникальных идентификаторов

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateCommentId = createIdGenerator();
const generatePictureId = createIdGenerator();

// добавляет случайные комментарии (создает массив)

const createMessage = () => Array.from(
  {length: getRandomInteger(MIN_STRING_IN_COMMENTS, MAX_STRING_IN_COMMENTS)}, () => gerRandomArrayElement(COMMENT_MESSAGES)).join(' ');

// создает объект с описанием комментария

const createComments = () => ({
  commentId: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: gerRandomArrayElement(NAMES),
});

// создает объект с описанием фотографии

const createPicture = () => ({
  id: generatePictureId(),
  url: `photos/${getRandomInteger(1, PICTURE_COUNT)}.jpg`,
  description: gerRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from ({length: getRandomInteger(0, MAX_COMMENT_COUNT - 1)}, createComments), // создает массив подобных комментариев
});

const getPictures = () => Array.from({length: PICTURE_COUNT}, createPicture);

getPictures();
