import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success');
const createSuccessMessage = () => successMessageTemplate.content.cloneNode(true);
const successButton = createSuccessMessage().querySelector('.success__button');

const removeSuccessMessage = () => {
  const currentSuccessMessage = document.querySelector('.success');
  if (currentSuccessMessage) {
    currentSuccessMessage.remove();
  }
};

const onSuccessButtonClick = () => {
  removeSuccessMessage();
};

const onDocumentKeydown = () => {
  if (isEscapeKey) {
    removeSuccessMessage();
  }
};

const onDocumentClick = () => {
  removeSuccessMessage();
};

const appendSuccessMessage = () => {
  document.body.appendChild(createSuccessMessage());
};

successButton.addEventListener('click', onSuccessButtonClick);
document.addEventListener('keydown', onDocumentKeydown);
document.addEventListener('click', onDocumentClick);

export { appendSuccessMessage };
