import {isEscEvent} from './util.js';

const bodyElement = document.querySelector('body');
const imageModalElement = document.querySelector('.big-picture');
const commentCountElement = imageModalElement.querySelector('.social__comment-count');
const commentListElement = imageModalElement.querySelector('.social__comments');
const commentsLoadingButton =  imageModalElement.querySelector('.social__comments-loader');
const modalImg = imageModalElement.querySelector('.big-picture__img').querySelector('img');
const modalLikes = imageModalElement.querySelector('.likes-count');
const modalDescription = imageModalElement.querySelector('.social__caption');
const imageModalCloseElement = imageModalElement.querySelector('.big-picture__cancel');

const onPopUpEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeModal();
  }
};

const openImageModal = () => {
  imageModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopUpEscKeydown);
  commentCountElement.classList.add('hidden');
  commentsLoadingButton.classList.add('hidden');
  bodyElement.classList.add('modal-open');
  imageModalCloseElement.addEventListener('click', onClickCloseButton);
};

const onClickCloseButton = () => {
  closeModal();
}

const closeModal = () => {
  imageModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopUpEscKeydown);
  bodyElement.classList.remove('modal-open');
  clearComments();
}

const renderImageModal = (picture) => {
  openImageModal();
  modalImg.src = picture.url;
  modalImg.alt = '';
  modalLikes.textContent = String(picture.likes);
  modalDescription.textContent = picture.description;

  if (picture.comments) {
    renderImageComments(picture.comments);
  }
}

const clearComments = () => {
  const commentsElements = imageModalElement.querySelectorAll('.social__comment');

  commentsElements.forEach((element) => {
    element.remove();
  })
};

const renderImageComments = (comments) => {
  clearComments();

  [...comments].forEach((item) => {
    const commentItemElement = document.createElement('li');
    commentItemElement.classList.add('social__comment');
    commentItemElement.innerHTML = `<img class="social__picture" src="${item.avatar}" alt="${item.name}" width="35" height="35">
      <p class="social__text">${item.message}</p>`;

    commentListElement.append(commentItemElement);
  });
}

export {renderImageModal};
