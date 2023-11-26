import { renderGallery } from './open-fullsize-picture.js';
import { openUploadPicture, closeUploadPicture } from './form.js';
import { renderMiniatures } from './create-miniatures.js';
import './slider.js';
import { getData } from './api.js';
import { showAlert } from './get-data-error-message.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
    renderMiniatures(pictures);
  } catch (error) {
    showAlert();
  }
};

bootstrap();
openUploadPicture();
closeUploadPicture();
