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

export { showAlert };
