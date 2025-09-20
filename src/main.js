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

const form = document.querySelector('.form');
const input = document.querySelector('.search-input');
const btn = document.querySelector('.btn-submit');

form.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();
  showLoader();

  let search = event.target.elements.search.value.trim().replace(/\s+/g, '+');
  console.log('search - ', search);

  if (!search) {
    hideLoader()
    event.target.elements.search.value = '';
    return showError('Sorry, you did not enter a query. Please try again!');
  }

  // search = search.replace(/\s+/g, '+');
  let arrImage;

  getImagesByQuery(search)
    .then(res => {
      arrImage = res.hits;
      console.log(arrImage);

      let numderImg = arrImage.length;
      if (numderImg === 0) {
        hideLoader();
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



