import { renderGallery } from './open-fullsize-picture.js';
import { openUploadPicture, closeUploadPicture } from './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initFilters } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
    initFilters();
  } catch (error) {
    showAlert();
  }
};

bootstrap();
openUploadPicture();
closeUploadPicture();


