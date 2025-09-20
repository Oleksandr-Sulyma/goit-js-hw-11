// getImagesByQuery(query). Ця функція повинна приймати
//  один параметр query (пошукове слово, яке є рядком),
// здійснювати HTTP-запит і повертати значення властивості
// data з отриманої відповіді.

import axios from 'axios';

const requestPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '49732510-ee91a196325b5e5f0a6aadbb3',
    per_page: '18',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export default function getImagesByQuery(query) {
  return requestPixabay('', {
    params: {
      q: `${query}`,
    },
  })
  .then(res =>res.data);
}
