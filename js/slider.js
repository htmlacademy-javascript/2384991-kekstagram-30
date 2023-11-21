const effectList = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    unit: '%',
    step: 1,
    start: 100,
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    unit: 'px',
    step: 0.1,
    start: 3,
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
  },
  default: {
    filter: 'none',
    min: 0,
    max: 100,
    unit: 'px',
    step: 1,
    start: 100,
  }
};

const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const effectLevelInput = form.querySelector('.effect-level__value');
const uploadImagePreview = form.querySelector('.img-upload__preview img');
const effects = form.querySelector('.effects');
const effectLevelContainer = form.querySelector('.img-upload__effect-level');

let selectedEffect = 'default';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  connect: 'lower',
  start: effectList[selectedEffect].start,
  step: effectList[selectedEffect].step,
});

// редактировать масштаб изображения

// наложение эффектов
