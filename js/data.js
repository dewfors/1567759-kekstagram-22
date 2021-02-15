import {getRandomIntegerFromRange, generateId, getRandomIndex} from './util.js';

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
const INITIAL_POST_COUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createComment = () => {
  const avatarNumber = getRandomIntegerFromRange(1, 6);
  return {
    id: generateId(),
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: getRandomIndex(MESSAGES),
    name: getRandomIndex(NAMES),
  }
}

const createObject = (id = 1) => {
  const comments = new Array(getRandomIntegerFromRange(1, 5)).fill().map(createComment);
  return {
    id: ++id,
    url: `photos/${id}.jpg`,
    description: getRandomIndex(DESCRIPTIONS),
    likes: getRandomIntegerFromRange(15, 200),
    comments: comments,
  }
}

const createPhotos = () => {
  return new Array(INITIAL_POST_COUNT).fill().map((_, i) => createObject(i));
}
// const commentList = new Array(INITIAL_POST_COUNT).fill().map((_, i) => createObject(i));

export {INITIAL_POST_COUNT, createObject, createPhotos};
