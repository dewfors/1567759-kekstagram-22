import {getRandomiseArray} from './util.js';

const COUNT_RANDOM_PICTURES = 10;

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultElement = imgFiltersElement.querySelector('#filter-default');
const filterRandomElement = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedElement = imgFiltersElement.querySelector('#filter-discussed');

const filters = {
  default: 'default',
  random: 'random',
  discussed: 'discussed',
}

const filterActive = {
  current: filters.default,
}

const setFilter = (value) => {
  filterActive.current = value;
};

const showImgFilters = () => {
  imgFiltersElement.classList.toggle('img-filters--inactive');
};

const FILTER_BUTTON_ACTIVE_CLASS = 'img-filters__button--active';

const clearActiveFilter = () => {
  filterDefaultElement.classList.remove(FILTER_BUTTON_ACTIVE_CLASS);
  filterRandomElement.classList.remove(FILTER_BUTTON_ACTIVE_CLASS);
  filterDiscussedElement.classList.remove(FILTER_BUTTON_ACTIVE_CLASS);
};

const setFilterDefault = (cb) => {
  filterDefaultElement.addEventListener('click', () => {
    clearActiveFilter();
    filterDefaultElement.classList.add(FILTER_BUTTON_ACTIVE_CLASS);
    setFilter(filters.default);
    cb();
  });
};

const setFilterRandom = (cb) => {
  filterRandomElement.addEventListener('click', () => {
    clearActiveFilter();
    filterRandomElement.classList.add(FILTER_BUTTON_ACTIVE_CLASS);
    setFilter(filters.random);
    cb();
  });
};

const setFilterDiscussed = (cb) => {
  filterDiscussedElement.addEventListener('click', () => {
    clearActiveFilter();
    filterDiscussedElement.classList.add(FILTER_BUTTON_ACTIVE_CLASS);
    setFilter(filters.discussed);
    cb();
  });
};

const getFiltredPicturesRandom = (userPictures) => {
  return getRandomiseArray(userPictures, COUNT_RANDOM_PICTURES);
}

const sortPictures = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;

  return rankB - rankA;
}

const getFiltredPicturesDiscussed = (userPictures) => {
  // return userPictures
  //   .slice()
  //   .sort(sortPictures);
  return [...userPictures].sort(sortPictures);
}

const getFiltredPictures = (userPictures) => {
  const filter = filterActive.current;

  switch (filter) {
    case 'default':
      return userPictures.slice();
    case 'random':
      return getFiltredPicturesRandom(userPictures);
    case 'discussed':
      return getFiltredPicturesDiscussed(userPictures);
  }
}

const removePictures = () => {
  const currentPictures = pictureListElement.querySelectorAll('.picture');
  currentPictures.forEach((pictureElement) => {
    pictureElement.remove();
  })
};

const renderPictures = (userPictures) => {
  const pictureListFragment = document.createDocumentFragment();
  const pictures = getFiltredPictures(userPictures);

  pictures.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureListFragment.appendChild(pictureElement);
  });

  removePictures();
  pictureListElement.appendChild(pictureListFragment);

};

export {renderPictures, showImgFilters, setFilterDefault, setFilterRandom, setFilterDiscussed};
