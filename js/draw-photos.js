import {createPhotos} from './data.js';

const pictureListElement = document.querySelector('.pictures')
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPictures = createPhotos();

const pictureListFragment = document.createDocumentFragment();

userPictures.forEach((userPicture) =>{
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').setAttribute('src', userPicture.url);
  pictureElement.querySelector('.picture__likes').textContent = userPicture.likes;
  pictureElement.querySelector('.picture__comments').textContent = userPicture.comments.length;

  pictureListFragment.appendChild(pictureElement);
});

pictureListElement.appendChild(pictureListFragment);
