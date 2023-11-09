import { getPictures, PICTURE_COUNT } from './create-picture.js';

getPictures(PICTURE_COUNT);

const picturesContainer = document.querySelector('.pictures');
const similarMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarMiniatures = getPictures(PICTURE_COUNT);

const renderMiniatures = () => {

  const miniatureFragment = document.createDocumentFragment();

  similarMiniatures.forEach(({url, description, comments, likes}) => {
    const miniatureTemplate = similarMiniatureTemplate.cloneNode(true);
    miniatureTemplate.querySelector('.picture__img').src = url;
    miniatureTemplate.querySelector('.picture__img').alt = description;
    miniatureTemplate.querySelector('.picture__comments').textContent = comments;
    miniatureTemplate.querySelector('.picture__likes').textContent = likes;
    miniatureFragment.append(miniatureTemplate);
  });

  picturesContainer.append(miniatureFragment);
};


export { renderMiniatures };
