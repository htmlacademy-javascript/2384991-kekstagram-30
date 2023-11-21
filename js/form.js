import { isEscapeKey } from './util.js';
import { resetScale } from './scale-control.js';


const form = document.querySelector('.img-upload__form');
const uploadPictureContainer = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const uploadPictureClose = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = () => {
  const hashtags = hashtagField.value.trim().toLowerCase().split(' ').filter((tag) => Boolean(tag.length));
  return hashtags.every((tag) => VALID_HASHTAG.test(tag));
};

pristine.addValidator(hashtagField, validateHashtag, 'Введён некорректный хэш-тег');

const checkNumberOfHashtags = () => {
  const hashtags = hashtagField.value.trim().toLowerCase().split(' ').filter((tag) => Boolean(tag.length));
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(hashtagField, checkNumberOfHashtags, 'Количество введенных хэш-тегов не должно превышать пять');

const validateUniqueHashtags = () => {
  const hashtags = hashtagField.value.trim().toLowerCase().split(' ').filter((tag) => Boolean(tag.length));
  const uniqueHashtags = new Set (hashtags);
  return hashtags.length === uniqueHashtags.size;
};

pristine.addValidator(hashtagField, validateUniqueHashtags, 'Хэш-теги не могут повторяться');

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    uploadPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const renderUploadPicture = () => {
  const openUploadPicture = () => {
    uploadPictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const onOpenUploadPictureChange = () => {
    openUploadPicture();
  };

  uploadInput.addEventListener('change', onOpenUploadPictureChange);

  const closeUploadPicture = () => {
    form.reset();
    pristine.reset();
    uploadInput.value = '';
    resetScale();
    uploadPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onCloseButtonClick = () => {
    closeUploadPicture();
  };

  uploadPictureClose.addEventListener('click', onCloseButtonClick);

};

export { renderUploadPicture };
