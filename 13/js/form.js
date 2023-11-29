import { isEscapeKey } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';
import { resetScale } from './scale-control.js';
import { resetValues, uploadImagePreview } from './slider.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const form = document.querySelector('.img-upload__form');
const uploadPictureContainer = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const uploadPictureClose = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const effectsPreviews = form.querySelectorAll('.effects__preview');

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const sendPhoto = async (evt, onSuccess) => {
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    try {
      await sendData(
        formData,
        () => {
          onSuccess();
        }
      );
    } catch (error) {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  }
};

const setUserFormSubmit = (onSuccess) => {
  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    sendPhoto(evt, onSuccess);
  };

  form.addEventListener('submit', onFormSubmit);
};

const onDocumentKeydown = (evt) => {
  const isErrorMessageExist = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExist) {
    evt.preventDefault();
    form.reset();
    pristine.reset();
    uploadImagePreview.removeAttribute('src');
    resetScale();
    resetValues();
    uploadPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openUploadPicture = () => {
  uploadPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onOpenUploadPictureChange = () => {
  const file = uploadInput.files[0];

  if (file && isValidType(file)) {
    uploadImagePreview.src = URL.createObjectURL(file);
    //effectsPreviews.forEach((preview) => {
     // preview.style.backgroundImage = `url('${uploadImagePreview.src}')`;
    //});
  }
  openUploadPicture();
};

uploadInput.addEventListener('change', onOpenUploadPictureChange);

const closeUploadPicture = () => {
  form.reset();
  pristine.reset();
  uploadImagePreview.removeAttribute('src');
  resetScale();
  resetValues();
  uploadPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  closeUploadPicture();
};

uploadPictureClose.addEventListener('click', onCloseButtonClick);

setUserFormSubmit(
  () => {
    showSuccessMessage();
    closeUploadPicture();
  },
);

export { openUploadPicture, closeUploadPicture, setUserFormSubmit };
