// с этим кодом работало все, но при нажатии на окно с ошибкой на любое произвольное место, происходило закрытие,
// несмотря на if (evt.target.closest('.succes__inner'))

import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const createSuccessMessage = () => successMessageTemplate.cloneNode(true);
const currentSuccessMessage = createSuccessMessage();
const successButton = successMessageTemplate.querySelector('.success__button');

const appendSuccessMessage = () => {
  document.body.append(currentSuccessMessage);
};

const removeSuccessMessage = () => {
  if (currentSuccessMessage) {
    currentSuccessMessage.remove();
  }
};

const onSuccessButtonClick = () => {
  removeSuccessMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeSuccessMessage();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.closest('.succes__inner')) {
    return;
  }
  removeSuccessMessage();
};

successButton.addEventListener('click', onSuccessButtonClick);
document.addEventListener('keydown', onDocumentKeydown);
document.addEventListener('click', onDocumentClick);

export { appendSuccessMessage };
