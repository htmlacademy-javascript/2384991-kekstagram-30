import { isEscapeKey, isEnterKey } from './util.js';
import { picturesContainer } from './miniatures.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureClose = bigPictureContainer.querySelector('.big-picture__cancel');
// const bigPicturePreview = bigPictureContainer.querySelector('.big-picture__preview');
// const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const openBigPicture = (target) => {
  if (target.closest('.picture')) {
    bigPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesContainer.addEventListener('click', (evt) => {
  openBigPicture(evt.target);
});

picturesContainer.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openBigPicture(evt.target);
  }
});

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture, closeBigPicture };
