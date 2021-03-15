
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

//Проверка поля коментариев
const checkValidityDescription = () => {
  if (!checkLengthDescription(description.value, DESCRIPTION_MAX_LENGTH)) {
    description.setCustomValidity(LENGTH_ERROR_MESSAGE);
    description.classList.add(ERROR_STATE);
  } else {
    description.setCustomValidity('');
    description.classList.remove(ERROR_STATE);
  }
  description.reportValidity();
}

// Проверка поля хештег
// Проверка строки, с попощью регулярки
const checkHashTag = (string) => {
  return REGEX.test(string);
};

//Проверка на уникальность с помощью new Set
const checkUniqueHashTag = (array) => {
  const hashtagLower = array.map(letter => {
    return letter.toLowerCase();
  });

  const uniqueArr = new Set(hashtagLower);
  return array.length === uniqueArr.size;

};


const checkValidityHashtag = () => {
  //Считуем введеное значение и преобразуем в массив
  const hashtagArrOrigin = hashtags.value.split(' ');
  //Копируем введеднные данные в массив чтоб сохранять хештеги
  const hashtagArray = hashtagArrOrigin.filter(elem => elem !== '');
  //это ниже 3 проверки, на длину, на формат и на уникальноть, если какое-то из них отдает true , то условие и срабатывает в switch case
  const hashtagErrorCount = hashtagArray.length > 5;
  const hashtagErrorFormat = !hashtagArray.every(checkHashTag);
  const hashtagErrorUniq = !checkUniqueHashTag(hashtagArray);

  switch (true) {
    case hashtagErrorFormat:
      hashtags.setCustomValidity(FORMAT_ERROR_MESSAGE);
      hashtags.classList.add(ERROR_STATE);
      break;
    case hashtagErrorCount:
      hashtags.setCustomValidity(COUNT_ERROR_MESSAGE);
      hashtags.classList.add(ERROR_STATE);
      break;
    case hashtagErrorUniq:
      hashtags.setCustomValidity(UNIQUE_ERROR_MESSAGE);
      hashtags.classList.add(ERROR_STATE);
      break;
    default:
      hashtags.setCustomValidity('');
      hashtags.classList.remove(ERROR_STATE);
  }

  hashtags.reportValidity();
};

description.addEventListener('input', checkValidityDescription);
hashtags.addEventListener('input', checkValidityHashtag);

export {checkValidityDescription, checkValidityHashtag}
