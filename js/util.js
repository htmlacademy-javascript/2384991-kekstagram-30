const REMOVE_MESSAGE_TIMEOUT = 5000;

const showAlert = () => {
  const dataErrorMessageTemplate = document.querySelector('#data-error');
  const dataErrorMessage = dataErrorMessageTemplate.content.cloneNode(true);
  document.body.appendChild(dataErrorMessage);
  const alertContainer = document.querySelector('.data-error');

  setTimeout(() => {
    alertContainer.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showAlert, debounce };
