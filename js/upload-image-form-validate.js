const DESCRIPTION_MAX_LENGTH = 140;
const ERROR_STATE = 'error-field';
const MAX_COUNT_HASHTAG = 5;
const REGEX = /^#[^\W_]{1,19}$/; // Регулярка сразу проверяет что строка нчало с # только цифры и символы и что всего 20 симоволов
const FORMAT_ERROR_MESSAGE = `Хэштег должен начинаться с # и состоять из букв и чисел,
и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),
символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т.д`;
const COUNT_ERROR_MESSAGE = `Максимальное колличество хэштегов ${MAX_COUNT_HASHTAG}`;
const UNIQUE_ERROR_MESSAGE = 'Хэштег должен быть уникальным.';
const LENGTH_ERROR_MESSAGE = 'Комментарий не может быть больше ' + DESCRIPTION_MAX_LENGTH + ' символов';

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const checkLengthDescription = (value, maxLength) => {
  return value.length < maxLength;
}

const showValidationMessage = (element, message) => {
  element.setCustomValidity(message);
  element.classList.add(ERROR_STATE);
};

const hideValidationMessage = (element) => {
  element.setCustomValidity('');
  element.classList.remove(ERROR_STATE);
};

const checkValidityDescription = () => {
  if (!checkLengthDescription(description.value, DESCRIPTION_MAX_LENGTH)) {
    showValidationMessage(description, LENGTH_ERROR_MESSAGE);
  } else {
    hideValidationMessage(description);
  }
  description.reportValidity();
}

const checkHashTag = (string) => {
  return REGEX.test(string);
};

const checkUniqueHashTag = (array) => {
  const hashtagLower = array.map(letter => {
    return letter.toLowerCase();
  });

  const uniqueArr = new Set(hashtagLower);
  return array.length === uniqueArr.size;
};

const checkValidityHashtag = () => {
  const hashtagArrOrigin = hashtags.value.split(' ');
  const hashtagArray = hashtagArrOrigin.filter(elem => elem !== '');
  const hashtagErrorCount = hashtagArray.length > 5;
  const hashtagErrorFormat = !hashtagArray.every(checkHashTag);
  const hashtagErrorUniq = !checkUniqueHashTag(hashtagArray);

  switch (true) {
    case hashtagErrorFormat:
      showValidationMessage(hashtags, FORMAT_ERROR_MESSAGE);
      break;
    case hashtagErrorCount:
      showValidationMessage(hashtags, COUNT_ERROR_MESSAGE);
      break;
    case hashtagErrorUniq:
      showValidationMessage(hashtags, UNIQUE_ERROR_MESSAGE);
      break;
    default:
      hideValidationMessage(hashtags);
  }

  hashtags.reportValidity();
};

description.addEventListener('input', checkValidityDescription);
hashtags.addEventListener('input', checkValidityHashtag);

export {checkValidityDescription, checkValidityHashtag}
