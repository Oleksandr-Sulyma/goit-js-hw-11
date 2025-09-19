import axios from 'axios';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
} from './js/render-functions';

import './css/styles.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const btn = document.querySelector('.btn-submit');

form.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();
  showLoader();

  let search = event.target.elements.search.value.trim();
  if (!search) {
    hideLoader();
    event.target.elements.search.value = '';
    return showError('Sorry, you did not enter a query. Please try again!');
  }

  search = search.replace(/\s+/g, '+');

  getImagesByQuery(search)
    .then(res => {
      const arrImage = res.data.hits;
      if (arrImage.length === 0) {
        return showError(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      }
      createGallery(arrImage);
    })
    .catch(error => {
      showError(`Error: ${error.message}`);
      console.log('Error:', error.message);
    })
    .finally(() => {
      hideLoader();
      event.target.elements.search.value = '';
    });
});

