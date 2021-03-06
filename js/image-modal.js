import {HIDDEN_STATE, MODAL_OPEN_STATE} from './constants.js';
import {isEscEvent} from './util.js';
import {COUNT_COMMENTS_TO_LOADER} from './constants.js';

let numberOfCommentsShown = 0;
let commentsList = null;

const bodyElement = document.querySelector('body');
const imageModalElement = document.querySelector('.big-picture');
const commentCountElement = imageModalElement.querySelector('.social__comment-count');
const commentListElement = imageModalElement.querySelector('.social__comments');
const commentsLoaderButton = imageModalElement.querySelector('.comments-loader');
const modalImg = imageModalElement.querySelector('.big-picture__img').querySelector('img');
const modalLikes = imageModalElement.querySelector('.likes-count');
const modalDescription = imageModalElement.querySelector('.social__caption');
const imageModalCloseElement = imageModalElement.querySelector('.big-picture__cancel');

const onPopUpEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeModal();
  }
};

const showCommentsLoaderButton = () => {
  commentsLoaderButton.classList.remove(HIDDEN_STATE);
};

const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add(HIDDEN_STATE);
};

const openImageModal = () => {
  imageModalElement.classList.remove(HIDDEN_STATE);
  document.addEventListener('keydown', onPopUpEscKeydown);
  commentCountElement.classList.add(HIDDEN_STATE);
  bodyElement.classList.add(MODAL_OPEN_STATE);
  imageModalCloseElement.addEventListener('click', onClickCloseButton);
};

const onClickCloseButton = () => {
  closeModal();
}

const closeModal = () => {
  imageModalElement.classList.add(HIDDEN_STATE);
  document.removeEventListener('keydown', onPopUpEscKeydown);
  bodyElement.classList.remove(MODAL_OPEN_STATE);
  clearComments();
  numberOfCommentsShown = 0;
  commentsLoaderButton.removeEventListener('click', onShowMoreComments);
  commentsList = null;
}

const renderImageModal = (picture) => {
  openImageModal();
  modalImg.src = picture.url;
  modalImg.alt = '';
  modalLikes.textContent = picture.likes;
  modalDescription.textContent = picture.description;

  if (picture.comments) {
    commentsList = [...picture.comments];
    renderImageComments();
  }
}

const clearComments = () => {
  const commentsElements = imageModalElement.querySelectorAll('.social__comment');

  commentsElements.forEach((element) => {
    element.remove();
  })
};

const onShowMoreComments = () => {
  if (numberOfCommentsShown === commentsList.length) {
    return;
  }

  const numberOfComments = numberOfCommentsShown;
  let commentsToLoader = 0;

  numberOfCommentsShown += COUNT_COMMENTS_TO_LOADER;
  if (numberOfCommentsShown > commentsList.length) {
    numberOfCommentsShown = commentsList.length;
    hideCommentsLoaderButton();

  }
  commentsToLoader = numberOfCommentsShown - numberOfComments;

  [...commentsList].slice((numberOfCommentsShown - commentsToLoader), numberOfCommentsShown)
    .forEach((item) => {
      const commentItemElement = document.createElement('li');
      commentItemElement.classList.add('social__comment');

      const commentImageElement = document.createElement('img');
      commentImageElement.classList.add('social__picture');
      commentImageElement.src = item.avatar;
      commentImageElement.alt = item.name;
      commentImageElement.width = '35';
      commentImageElement.height = '35';
      commentItemElement.appendChild(commentImageElement);

      const commentMessageElement = document.createElement('p');
      commentMessageElement.classList.add('social__text');
      commentMessageElement.textContent = item.message;
      commentItemElement.appendChild(commentMessageElement);

      commentListElement.append(commentItemElement);
    });
};

const renderImageComments = () => {
  clearComments();
  showCommentsLoaderButton();
  onShowMoreComments();

  commentsLoaderButton.addEventListener('click', onShowMoreComments);
}

export {renderImageModal};
