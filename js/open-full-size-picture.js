import { renderComments } from './create-social-comments.js';
import { isEscapeKey } from './util.js';
import { renderMiniatures } from './create-miniatures.js';

const picturesContainer = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureClose = bigPictureContainer.querySelector('.big-picture__cancel');

let commentsLoaderRemoveListener;

const onOpenBigPictureClick = (evt, pictures) => {
  openBigPicture(evt.target, pictures);
};

const renderFullSizePicture = ({ url, description, likes, comments }) => {
  const newImage = bigPictureContainer.querySelector('.big-picture__img img');

  newImage.src = url;
  newImage.alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;

  if (commentsLoaderRemoveListener) {
    commentsLoaderRemoveListener();
  }

  commentsLoaderRemoveListener = renderComments(comments);
};


const removeEventListeners = (pictures) => {
  picturesContainer.removeEventListener('click', (evt) => onOpenBigPictureClick(evt, pictures));
};

const renderGallery = (pictures) => {

  removeEventListeners();
  picturesContainer.addEventListener('click', (evt) => onOpenBigPictureClick(evt, pictures));

  renderMiniatures(pictures);
};

function openBigPicture(target, pictures) {
  const miniature = target.closest('[data-miniature-id]');

  if (!miniature) {
    return;
  }

  const miniatureId = parseInt(miniature.dataset.miniatureId, 10);
  const selectedPicture = pictures.find(({ id }) => id === miniatureId);

  if (!selectedPicture) {
    return;
  }

  renderFullSizePicture(selectedPicture);
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}


const closeBigPicture = (pictures) => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  picturesContainer.removeEventListener('click', (evt) => onOpenBigPictureClick(evt, pictures));
  if (commentsLoaderRemoveListener) {
    commentsLoaderRemoveListener();
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCloseButtonClick = () => {
  closeBigPicture();
};

bigPictureClose.addEventListener('click', onCloseButtonClick);

export { renderGallery };
