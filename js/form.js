import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadPictureContainer = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input ');
const uploadPictureClose = form.querySelector('.img-upload__cancel');
const effectLevelSlider = form.querySelector('.effect-level__slider');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const renderUploadPicture = () => {
  const openUploadPicture = () => {
    uploadPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  uploadInput.addEventListener('change', openUploadPicture);

  const closeUploadPicture = () => {
    uploadPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onClosePictureButtonClick = () => {
    closeUploadPicture();
  };

  uploadPictureClose.addEventListener('click', onClosePictureButtonClick);

};


export { renderUploadPicture };
