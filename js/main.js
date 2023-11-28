import { renderGallery } from './open-fullsize-picture.js';
import { openUploadPicture, closeUploadPicture } from './form.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
  } catch (error) {
    showAlert();
  }
};

bootstrap();
openUploadPicture();
closeUploadPicture();
