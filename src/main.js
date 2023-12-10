import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const searchQuery = searchForm.querySelector('[name="search-query"]');
const loading = document.querySelector('.loader');
let gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const pixabayOptions = new URLSearchParams({
  key: '41169627-a3aa19c241ef281e8692ca10a',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '9',
  safesearch: true,
});

const mainObject = {
  httpsRequest(ulr) {
    this.removeChilds();
    loading.style.display = 'block';
    fetch(ulr)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(posts => {
        if (posts.hits.length > 0) {
          this.imagesOnPage(posts);
        } else {
          this.noResults();
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        loading.style.display = 'none';
      });
  },

  noResults() {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: 'white',
      backgroundColor: 'rgb(255, 132, 132)',
      position: 'topRight',
    });
  },

  imagesOnPage(posts) {
    let htmlCode = '';
    const htmlGen = () => {
      posts.hits.forEach(hit => {
        htmlCode += `<li class="gallery-item">
    <a class="gallery-link" href="${hit.largeImageURL}">
      <img
        class="gallery-image"
        src="${hit.webformatURL}"
        alt="${hit.tags}"
      />
    </a>
    <div class="characteristics-container">
      <div class="photo-characteristics">
        <p>Likes</p>
        <p>${hit.likes}</p>
      </div>
      <div class="photo-characteristics">
        <p>Views</p>
        <p>${hit.views}</p>
      </div>
      <div class="photo-characteristics">
        <p>Comments</p>
        <p>${hit.comments}</p>
      </div>
      <div class="photo-characteristics">
        <p>Downloads</p>
        <p>${hit.downloads}</p>
      </div>
    </div>
  </li>`;
      });
    };
    htmlGen();
    gallery.insertAdjacentHTML('afterbegin', htmlCode);
    lightbox.refresh();
    searchQuery.value = '';
  },

  removeChilds() {
    let removeChilds = gallery.querySelectorAll('.gallery-item');
    removeChilds.forEach(child => {
      child.remove();
    });
  },
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  pixabayOptions.set('q', searchQuery.value.toString());
  let ulr = `http://pixabay.com/api?${pixabayOptions}`;
  console.log(ulr);
  mainObject.httpsRequest(ulr);
});
