import {isEscEvent} from './util.js';

const CLASS_HIDDEN = 'hidden';
const CLASS_MODAL_OPEN = 'modal-open';

const bodyElement = document.body;
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
  imageModalElement.classList.remove(CLASS_HIDDEN);
  document.addEventListener('keydown', onPopUpEscKeydown);
  commentCountElement.classList.add(CLASS_HIDDEN);
  commentsLoadingButton.classList.add(CLASS_HIDDEN);
  bodyElement.classList.add(CLASS_MODAL_OPEN);
  imageModalCloseElement.addEventListener('click', onClickCloseButton);
};

const onClickCloseButton = () => {
  closeModal();
}

const closeModal = () => {
  imageModalElement.classList.add(CLASS_HIDDEN);
  document.removeEventListener('keydown', onPopUpEscKeydown);
  bodyElement.classList.remove(CLASS_MODAL_OPEN);
  clearComments();
}

const renderImageModal = (picture) => {
  openImageModal();
  modalImg.src = picture.url;
  modalImg.alt = '';
  modalLikes.textContent = picture.likes;
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
