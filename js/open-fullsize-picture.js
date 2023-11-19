import { isEscapeKey } from './util.js';
import { picturesContainer, similarMiniatures, renderMiniatures } from './create-miniatures.js';
import { renderComments } from './create-social-comments.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureClose = bigPictureContainer.querySelector('.big-picture__cancel');

const renderFullsizePicture = ({ url, description, likes }) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const renderGallery = () => {
  const openBigPicture = (target) => {
    const miniature = target.closest('[data-miniature-id]');

    if (!miniature) {
      return;
    }

    const miniatureId = parseInt(miniature.dataset.miniatureId, 10);
    const selectedPicture = similarMiniatures.find(({ id }) => id === miniatureId);
    renderFullsizePicture(selectedPicture);
    renderComments(selectedPicture.comments);

    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const onOpenBigPictureClick = (evt) => {
    openBigPicture(evt.target);
  };

  picturesContainer.addEventListener('click', onOpenBigPictureClick);

  const closeBigPicture = () => {
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onCloseButtonClick = () => {
    closeBigPicture();
  };

  bigPictureClose.addEventListener('click', onCloseButtonClick);

  renderMiniatures();
};

export { renderGallery };
