//У файлі render-functions.js створи екземпляр SimpleLightbox
// для роботи з модальним вікном
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from '../img/bi_x-octagon.svg';

const galleryEl = document.querySelector('.gallery');
const span = document.querySelector('.loader');
const loaderOverlay = document.querySelector('.loader-overlay');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// createGallery(images). Ця функція повинна приймати масив
//  images, створювати HTML-розмітку для галереї, додавати її
// в контейнер галереї та викликати метод екземпляра
// SimpleLightbox refresh(). Нічого не повертає.

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        user,
      }) =>
        `
<li><a class="image-wrapper" href="${largeImageURL}">
<img class="image" src="${webformatURL}" alt='Tags: ${tags}' title="${tags}"/>
<ul class="stats-image">
<li class="stat-item">
<h3 class="stat-title">Likes</h3>
<p class="stat-text">${likes}</p>
</li>
<li class="stat-item">
<h3 class="stat-title">Views</h3>
<p class="stat-text">${views}</p>
</li>
<li class='stat-item'>
<h3 class="stat-title">Comments</h3>
<p class="stat-text">${comments}</p>
</li>
<li class='stat-item'>
<h3 class="stat-title">Downloads</h3>
<p class="stat-text">${downloads}</p>
</li>
</ul>
</a>
</li>
    `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

// clearGallery(). Ця функція нічого не приймає та повинна
// очищати вміст контейнера галереї. Нічого не повертає.

export function clearGallery() {
  galleryEl.innerHTML = '';
  lightbox.refresh();
}

// showLoader(). Ця функція нічого не приймає, повинна додавати
//  клас для відображення лоадера. Нічого не повертає.

export function showLoader() {
  loaderOverlay.classList.add('active');
}

// hideLoader(). Ця функція нічого не приймає, повинна прибирати
//  клас для відображення лоадера. Нічого не повертає.

export function hideLoader() {
  let sum = 0;
  const arr = galleryEl.querySelectorAll('img');
  if (arr.length === 0) {
    loaderOverlay.classList.remove('active');
    span.classList.remove('active');
    return;
  }
  arr.forEach(el => {
    el.addEventListener('load', () => {
      sum += 1;
      if (sum === arr.length) {
        loaderOverlay.classList.remove('active');
      }
    });
  });
}

export function showError(message) {
  iziToast.show({
    message: `${message}`,
    backgroundColor: '#ef4040',
    position: 'topRight',
    maxWidth: 482,
    messageColor: 'white',
    theme: 'dark',
    messageSize: '16',
    iconUrl: errorIcon,
  });
}
