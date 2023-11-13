import { getPictures, PICTURE_COUNT } from './create-picture.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarMiniatures = getPictures(PICTURE_COUNT);

const renderMiniatures = () => {

  const miniatureFragment = document.createDocumentFragment();

  similarMiniatures.forEach(({ url, description, comments, likes, id }) => {
    const miniatureTemplate = similarMiniatureTemplate.cloneNode(true);

    miniatureTemplate.querySelector('.picture__img').src = url;
    miniatureTemplate.querySelector('.picture__img').alt = description;
    miniatureTemplate.querySelector('.picture__comments').textContent = comments.length;
    miniatureTemplate.querySelector('.picture__likes').textContent = likes;
    miniatureTemplate.dataset.miniatureId = id;

    miniatureFragment.append(miniatureTemplate);
  });

  picturesContainer.append(miniatureFragment);
};

const clearMiniatures = () => {
  picturesContainer.innerHTML = '';
};


export { picturesContainer, similarMiniatures, renderMiniatures, clearMiniatures };
