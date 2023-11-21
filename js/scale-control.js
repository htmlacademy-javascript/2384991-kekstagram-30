const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const uploadImagePreview = form.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 100;

const setScale = (value) => {
  const scalePercentage = `${value}%`;
  uploadImagePreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = scalePercentage;
};

const onControlSmallerClick = () => {
  const newValue = Math.max(parseFloat(scaleControlValue.value) - 25, 25);
  setScale(newValue);
};

const onControlBiggerClick = () => {
  const newValue = Math.min(parseFloat(scaleControlValue.value) + 25, 100);
  setScale(newValue);
};

const resetScale = () => {
  setScale(DEFAULT_SCALE);
};

scaleControlSmaller.addEventListener('click', onControlSmallerClick);
scaleControlBigger.addEventListener('click', onControlBiggerClick);

export { setScale, resetScale };
