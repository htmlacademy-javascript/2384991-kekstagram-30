import { renderGallery } from './open-fullsize-picture.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';

const RANDOM_MINIATURES_COUNT = 10;
const RERENDER_DELAY = 500;

const imageFilters = document.querySelector('.img-filters');
const filterButtons = imageFilters.querySelectorAll('.img-filters__button');

const getRandomMiniatures = (miniatures, count) => {
  const shuffled = miniatures.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const applyFilter = (filter) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });

  getData()
    .then((miniatures) => {
      let filteredMiniatures = miniatures;

      switch (filter) {
        case 'filter-random':
          filteredMiniatures = getRandomMiniatures(miniatures, RANDOM_MINIATURES_COUNT);
          break;
        case 'filter-discussed':
          filteredMiniatures = miniatures.slice().sort((a, b) => b.comments.length - a.comments.length);
          break;
      }

      renderGallery(filteredMiniatures);
    })
    .catch((err) => {
      showAlert(err.message);
    });
};

const debouncedRenderMiniatures = debounce(applyFilter, RERENDER_DELAY);

const onFilterChange = (evt) => {
  const filter = evt.target.id;

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');

  debouncedRenderMiniatures(filter);
};

const initFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterChange);
  });
};

export { initFilters };
