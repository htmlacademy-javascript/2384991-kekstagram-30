// создает уникальное позитивное рандомное число в указанном диапазоне

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// возвращает случайный элемент массива

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

// создает функцию-генератор для получения уникальных идентификаторов

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

export { getRandomInteger, getRandomArrayElement, createIdGenerator };
