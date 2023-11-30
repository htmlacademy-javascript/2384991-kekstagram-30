const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarMiniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderMiniatures = (pictures) => {

  const miniatureFragment = document.createDocumentFragment();

  pictures.forEach(({ url, description, comments, likes, id }) => {
    const miniatureTemplate = similarMiniatureTemplate.cloneNode(true);
    const miniatureImage = miniatureTemplate.querySelector('.picture__img');

    miniatureImage.src = url;
    miniatureImage.alt = description;
    miniatureTemplate.querySelector('.picture__comments').textContent = comments.length;
    miniatureTemplate.querySelector('.picture__likes').textContent = likes;
    miniatureTemplate.dataset.miniatureId = id;

    miniatureFragment.append(miniatureTemplate);
  });

  picturesContainer.append(miniatureFragment);
};

export { renderMiniatures };
