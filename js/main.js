const showFunctionException = (min, max) => {
  // параметры должны быть числами
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Параметры функции должны быть числами';
  }

  // диапазон только положительный, включая ноль
  if (min < 0 || max < 0) {
    throw 'Диапазон не может быть отрицательным';
  }

  // неправильный диапазон
  if (min > max) {
    throw 'Неверный диапазон';
  }
}

const getRandomIntegerFromRange = (min = 0, max = 10) => {
  showFunctionException(min, max);

  // диапазон из одинаковых чисел
  if (min === max) {
    // хотя здесь можно и ошибку сгенерировать
    return Math.floor(min);
  }

  // случайное число от min до (max+1)
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const isAllowedStringLength = (string = '', length = 10) => {
  if (typeof string !== 'string' || typeof length !== 'number') {
    throw 'Первый параметр должен быть строкой, второй должен быть числом';
  }

  return string.length <= length ? true : false;
}

getRandomIntegerFromRange(0, 10);
isAllowedStringLength('hello', 10);


const DESCRIPTIONS = [
  'Лапа спящего гризли',
  'Чикагская пицца глубокой прожарки',
  'Необычный постамент в центре Лондона',
  'Ловцы айсбергов',
  'Барбекю на подводной лодке',
  'Турист, проехавший от Мексики до Канады',
  'Четырехуровневая радуга',
  'Дерево великий баньян',
  'Турист и его лучший друг',
  'Первоапрельский шуточный завтрак',
  'Река между скалами',
  'Мужчина с дельтапланом на крыле самолета',
  'Библиотека Джорджа Пибоди, Балтимор, США',
  'Земля внутри колец Сатурна. Изображение показывает насколько наша планета меньше Сатурна',
  'Дарк Хеджес (Тёмные аллеи), Северная Ирландия',
  'Сводчатые потолки',
  'Ветровые фермы, вид сверху',
  'Аллея для долгой прогулки',
  'Заснеженный горнолыжный подъемник в Швеции',
];
const NAMES = [
  'Соня',
  'Вера',
  'Екатерина',
  'Никита',
  'Денис',
  'Константин',
  'Алина',
  'Савва',
  'Алексей',
  'Сергей',
  'Ольга',
  'Александр',
  'Анастасия',
  'Анна',
  'Дарья',
  'Мария',
  'Дмитрий',
  'Татьяна',
  'София',
];
const objects = [];
const comments = [];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createComment = () => {
  const commentIndex = comments.push({}) - 1;
  const avatarNumber = getRandomIntegerFromRange(1, 6);
  const comment = {
    id: commentIndex + 1,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: messages[getRandomIntegerFromRange(0, messages.length - 1)],
    name: NAMES[getRandomIntegerFromRange(0, NAMES.length - 1)],
  }
  comments[commentIndex] = comment;
  return comment;
}

const createUserComments = () => {
  const length = getRandomIntegerFromRange(1, 10);

  return new Array(length).fill(null).map(() => createComment());
}

const createObject = (id = 1) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomIntegerFromRange(0, DESCRIPTIONS.length - 1)],
    likes: getRandomIntegerFromRange(15, 200),
    comments: createUserComments(),
  }
}
const createObjects = () => {
  for (let i = 1; i <= 25; i++) {
    objects.push(createObject(i));
  }
}
createObjects();
