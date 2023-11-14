import { isEscapeKey, isEnterKey } from './util.js';
import { picturesContainer, similarMiniatures, renderMiniatures } from './create-miniatures.js';
import { renderComments } from './create-social-comments.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureClose = bigPictureContainer.querySelector('.big-picture__cancel');
const countComment = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');


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
    countComment.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  const onOpenPictureClick = (evt) => {
    openBigPicture(evt.target);
  };

  picturesContainer.addEventListener('click', onOpenPictureClick);

  const onOpenPictureKeydown = (evt) => {
    if (isEnterKey(evt)) {
      openBigPicture(evt.target);
    }
  };

  picturesContainer.addEventListener('keydown', onOpenPictureKeydown);

  const closeBigPicture = () => {
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onClosePictureButtonClick = () => {
    closeBigPicture();
  };

  bigPictureClose.addEventListener('click', onClosePictureButtonClick);

  renderMiniatures();
};

export { renderGallery };
