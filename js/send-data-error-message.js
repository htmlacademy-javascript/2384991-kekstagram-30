import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error');
const errorMessage = errorTemplate.content.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');


const appendErrorMessage = () => {
  const currentErrorMessage = document.querySelector('.error');
  document.body.appendChild(errorMessage);
  currentErrorMessage.classList.remove('hidden');
};

const removeErrorMessage = () => {
  const currentErrorMessage = document.querySelector('.error');
  if (currentErrorMessage) {
    currentErrorMessage.classList.add('hidden');
  }
};

const onDocumentClick = () => {
  removeErrorMessage();
};

const onDocumentKeydown = () => {
  if (isEscapeKey) {
    removeErrorMessage();
    document.removeEventListener('click', onDocumentClick);
  }
};

const onErrorButtonClick = () => {
  removeErrorMessage();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

document.addEventListener('keydown', onDocumentKeydown);
document.addEventListener('click', onDocumentClick);
errorButton.addEventListener('click', onErrorButtonClick);


export { appendErrorMessage, removeErrorMessage };
