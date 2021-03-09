import {getRandomiseArray} from './util.js';


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

// let filter = filters.default;

const setFilter = (value) => {
  filterActive.current = value;
};

const showImgFilters = () => {
  imgFiltersElement.classList.toggle('img-filters--inactive');
};

const clearActiveFilter = () => {
  filterDefaultElement.classList.remove('img-filters__button--active');
  filterRandomElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');
};

const setFilterDefault = (cb) => {
  filterDefaultElement.addEventListener('click', () => {
    clearActiveFilter();
    filterDefaultElement.classList.add('img-filters__button--active');
    setFilter(filters.default);
    cb();
  });
};
const setFilterRandom = (cb) => {
  filterRandomElement.addEventListener('click', () => {
    clearActiveFilter();
    filterRandomElement.classList.add('img-filters__button--active');
    setFilter(filters.random);
    cb();
  });
};
const setFilterDiscussed = (cb) => {
  filterDiscussedElement.addEventListener('click', () => {
    clearActiveFilter();
    filterDiscussedElement.classList.add('img-filters__button--active');
    setFilter(filters.discussed);
    cb();
  });
};

// filterDefaultElement.addEventListener('click', () => {
//   clearActiveFilter();
//   filterDefaultElement.classList.add('img-filters__button--active');
//   setFilter(filters.default);
// });

// filterRandomElement.addEventListener('click', () => {
//   clearActiveFilter();
//   filterRandomElement.classList.add('img-filters__button--active');
//   setFilter(filters.random);
// });

// filterDiscussedElement.addEventListener('click', () => {
//   clearActiveFilter();
//   filterDiscussedElement.classList.add('img-filters__button--active');
//   setFilter(filters.discussed);
// });

const COUNT_RANDOM_PICTURES = 10;

const getFiltredPicturesRandom = (userPictures) => {
  // console.log(getRandomiseArray(userPictures, COUNT_RANDOM_PICTURES));
  return getRandomiseArray(userPictures, COUNT_RANDOM_PICTURES);
}

const getFiltredPictures = (userPictures) => {

  const filter = filterActive.current;

  switch (filter) {
    case 'default':
      return userPictures.slice();
    case 'random':
      // return userPictures.slice(0, 10);
      return getFiltredPicturesRandom(userPictures);
    case 'discussed':
      return userPictures.slice();
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

  // userPictures.forEach(({url, likes, comments}) => {
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
