const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const uploadImagePreview = form.querySelector('.img-upload__preview img');

const setScale = (value) => {
  uploadImagePreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const newValue = Math.max(parseFloat(scaleControlValue.value) - SCALE_STEP, MIN_SCALE);
  setScale(newValue);
};

const onBiggerButtonClick = () => {
  const newValue = Math.min(parseFloat(scaleControlValue.value) + SCALE_STEP, MAX_SCALE);
  setScale(newValue);
};

const resetScale = () => setScale(DEFAULT_SCALE);

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);

export { setScale, resetScale };
