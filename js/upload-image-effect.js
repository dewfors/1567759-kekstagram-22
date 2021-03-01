import '../nouislider/nouislider.js';

const imageUploadEffectsBlock = document.querySelector('.img-upload__effect-level');
const imageUploadEffectsElement = document.querySelector('.img-upload__effects');
const effectsListElement = imageUploadEffectsElement.querySelector('.effects__list');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const defaultValueInputElement = document.querySelector('#effect-none');


const filters = {
  'none': {filter: 'none', minValue: 0, maxValue: 1, step: 1},
  'chrome': {filter: 'grayscale', minValue: 0, maxValue: 1, step: 0.1},
  'sepia': {filter: 'sepia', minValue: 0, maxValue: 1, step: 0.1},
  'marvin': {filter: 'marvin', minValue: 0, maxValue: 100, step: 1},
  'phobos': {filter: 'phobos', minValue: 0, maxValue: 3, step: 0.1},
  'heat': {filter: 'heat', minValue: 1, maxValue: 3, step: 0.1},
}

imageUploadEffectsBlock.style.display = 'none';
sliderValueElement.value = 80;

window.noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
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

sliderElement.noUiSlider.on('update', (values, handle) => {
  sliderValueElement.value = values[handle];
});

const setEffectLevel = (selectedEffect) => {
  switch (selectedEffect) {
    case 'chrome':
      imageUploadPreviewElement.style.filter = `grayscale(${sliderValueElement.value})`;
      break;
    case 'sepia':
      imageUploadPreviewElement.style.filter = `sepia(${sliderValueElement.value})`;
      break;
    case 'marvin':
      imageUploadPreviewElement.style.filter = `invert(${sliderValueElement.value}%)`;
      break;
    case 'phobos':
      imageUploadPreviewElement.style.filter = `blur(${sliderValueElement.value}px)`;
      break;
    case 'heat':
      imageUploadPreviewElement.style.filter = `brightness(${sliderValueElement.value})`;
      break;
    case 'none':
      imageUploadPreviewElement.style.filter = 'none';
      break;
  }
}

const clearEffect = () => {
  imageUploadPreviewElement.classList = '';
  imageUploadPreviewElement.classList.add('effects__preview--none');
  imageUploadEffectsBlock.style.display = 'none';
  defaultValueInputElement.checked = 'checked';
};


const setEffect = (evt) => {
  imageUploadPreviewElement.classList = '';
  imageUploadPreviewElement.classList.add(`effects__preview--${evt.target.value}`);

  if (evt.target.value === 'none') {
    imageUploadEffectsBlock.style.display = 'none';
  } else {
    imageUploadEffectsBlock.style.display = 'block';
  }

  const filter = filters[evt.target.value];


  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filter.minValue,
      max: filter.maxValue,
    },
    start: filter.maxValue,
    step: filter.step,
  });

  sliderElement.noUiSlider.on('update', () => {
    setEffectLevel(evt.target.value);
  });

}

effectsListElement.addEventListener('change', setEffect);

export {clearEffect};
