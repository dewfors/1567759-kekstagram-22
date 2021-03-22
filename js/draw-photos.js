/* global _:readonly */
import {getRandomiseArray} from './util.js';
import {renderImageModal} from './image-modal.js';
import {COUNT_RANDOM_PICTURES, RERENDER_DELAY} from './constants.js';

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultElement = imgFiltersElement.querySelector('#filter-default');
const filterRandomElement = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedElement = imgFiltersElement.querySelector('#filter-discussed');

const filters = {
  default: {
    type: 'default',
    element: filterDefaultElement,
  },
  random: {
    type: 'random',
    element: filterRandomElement,
  },
  discussed: {
    type: 'discussed',
    element: filterDiscussedElement,
  },
}

const filterActive = {
  current: filters.default.type,
}

const setActiveFilter = (value) => {
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

const setFilter = (filter, cb) => {
  filter.element.addEventListener('click', _.debounce(() => {
    clearActiveFilter();
    filter.element.classList.add(FILTER_BUTTON_ACTIVE_CLASS);
    setActiveFilter(filter.type);
    cb();
  }, RERENDER_DELAY));
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

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', () => {
      renderImageModal(picture);
    });

    pictureListFragment.appendChild(pictureElement);
  });

  removePictures();
  pictureListElement.appendChild(pictureListFragment);

};

export {renderPictures, showImgFilters, filters, setFilter};
