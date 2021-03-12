const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');
const imageUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlSmallerElement = imageUploadScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imageUploadScaleElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imageUploadScaleElement.querySelector('.scale__control--value');

const scaleProperty = {
  SCALE_MIN: 25,
  SCALE_MAX: 100,
  SCALE_STEP: 25,
}

const clearScaleImage = () => {
  scaleControlValueElement.value = `${scaleProperty.SCALE_MAX}%`;
};

const setScaleImage = ({target}) => {
  let scaleValue = parseInt(scaleControlValueElement.value);

  if (target === scaleControlSmallerElement) {
    if (scaleValue !== scaleProperty.SCALE_MIN) {
      scaleValue -= scaleProperty.SCALE_STEP;
    }
  }
  if (target === scaleControlBiggerElement) {
    if (scaleValue !== scaleProperty.SCALE_MAX) {
      scaleValue += scaleProperty.SCALE_STEP;
    }
  }
  scaleControlValueElement.value = `${scaleValue}%`;
  imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
}

scaleControlSmallerElement.addEventListener('click', setScaleImage);
scaleControlBiggerElement.addEventListener('click', setScaleImage);

export {clearScaleImage};
