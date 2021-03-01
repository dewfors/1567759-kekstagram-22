// import {createPhotos} from './data.js';


const pictureListElement = document.querySelector('.pictures')
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// const userPictures = createPhotos();


//
// const pictureListFragment = document.createDocumentFragment();
//
// // userPictures.forEach((userPicture) =>{
// userPictures.forEach(({url,likes,comments}) =>{
//   const pictureElement = pictureTemplate.cloneNode(true);
//
//   // pictureElement.querySelector('.picture__img').setAttribute('src', userPicture.url);
//   pictureElement.querySelector('.picture__img').src = url;
//   pictureElement.querySelector('.picture__likes').textContent = likes;
//   pictureElement.querySelector('.picture__comments').textContent = comments.length;
//
//   pictureListFragment.appendChild(pictureElement);
// });
//
// pictureListElement.appendChild(pictureListFragment);

const renderPictures = (userPictures) => {
  const pictureListFragment = document.createDocumentFragment();

  userPictures.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureListFragment.appendChild(pictureElement);
  });

  pictureListElement.appendChild(pictureListFragment);
};

export {renderPictures};
