const MIN_VALUE = 0;
const MAX_VALUE = 100;

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

let selectedEffect = effectList.default;

noUiSlider.create(slider, {
  range: {
    min: MIN_VALUE,
    max: MAX_VALUE,
  },
  connect: 'lower',
  start: selectedEffect.start,
  step: selectedEffect.step,
});


const updateImageStyle = () => {
  const effect = selectedEffect.filter;
  effectLevelInput.value = slider.noUiSlider.get();
  uploadImagePreview.style.filter = (selectedEffect === effectList.default) ? '' : `${effect}(${effectLevelInput.value}${selectedEffect.unit || ''})`;
};

const resetValues = () => {
  selectedEffect = 'none';
  uploadImagePreview.removeAttribute('style');
  effectLevelContainer.classList.add('hidden');
  updateImageStyle();
};


const handleEffectChange = (effect) => {
  if (effect === 'none') {
    resetValues();
  } else {
    selectedEffect = effectList[effect];
    slider.noUiSlider.updateOptions({
      range: {
        min: selectedEffect.min,
        max: selectedEffect.max,
      },
      start: selectedEffect.start,
      step: selectedEffect.step,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });
    effectLevelContainer.classList.remove('hidden');
    updateImageStyle();
  }
};

const onEffectsChange = (evt) => {
  handleEffectChange(evt.target.value);
};

effects.addEventListener('change', onEffectsChange);

slider.noUiSlider.on('update', () => {
  updateImageStyle();
});

updateImageStyle();
effectLevelContainer.classList.add('hidden');

export { resetValues, uploadImagePreview };
