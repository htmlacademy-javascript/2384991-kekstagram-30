// с этим кодом не работало закрытие по Esc, закрывались сразу и форма, и окно с ошибкой

import { isEscapeKey } from './util.js';


const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const createErrorMessage = () => errorMessageTemplate.cloneNode(true);
const currentErrorMessage = createErrorMessage();
const errorButton = currentErrorMessage.querySelector('.error__button');

const appendErrorMessage = () => {
  document.body.append(currentErrorMessage);
};

const removeErrorMessage = () => {
  if (currentErrorMessage) {
    //console.log('Removing error message');
    currentErrorMessage.remove();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.closest('.error__inner')) {
    return;
  }
  removeErrorMessage();
};

const onDocumentKeydown = (evt) => {
  const isErrorExist = Boolean(document.querySelector('.error'));
  if (!isErrorExist) {
    return;
  }

  if (isEscapeKey(evt) && isErrorExist) {
    removeErrorMessage();
    document.body.removeEventListener('click', onDocumentClick);
  }
};

const onErrorButtonClick = () => {
  // console.log('Error button clicked');
  removeErrorMessage();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onDocumentClick);
};

document.addEventListener('keydown', onDocumentKeydown);
document.body.addEventListener('click', onDocumentClick);
errorButton.addEventListener('click', onErrorButtonClick);


export { appendErrorMessage };
