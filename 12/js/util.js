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

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showAlert, debounce, throttle };
