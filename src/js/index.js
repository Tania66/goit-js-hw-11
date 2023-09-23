 import { Notify } from 'notiflix/build/notiflix-notify-aio';
 import SimpleLightbox from "simplelightbox";
 import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayApiServise from './pixabay-api'
import hitsHbs from '../templates/card-gallery.hbs'

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captions: true,
  captionsData: 'alt',
});


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const loader = document.querySelector('.load-more');



const pixabayApiServise = new PixabayApiServise();


form.addEventListener('submit', onSearch);
loader.addEventListener('click', onLoading);



 function onSearch(event) {
  event.preventDefault();

  pixabayApiServise.q = event.currentTarget.elements.searchQuery.value.trim();


if (pixabayApiServise.q ==='') {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

pixabayApiServise.resetPage();

pixabayApiServise.fechPixabayApi().then(hits => {
clearGalleryContainer(); 
 appendHitsMarkup(hits);
 if (!hits.length) {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
 }
});
lightbox.refresh();
loader.classList.remove('is-hidden');


}


function onLoading(){
  pixabayApiServise.fechPixabayApi().then(appendHitsMarkup);
  lightbox.refresh();
 const result = pixabayApiServise.fechPixabayApi();
let {totalHits} = result;
 console.log(totalHits);

}




function appendHitsMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', hitsHbs(hits));
  lightbox.refresh();
}


function clearGalleryContainer() {
  gallery.innerHTML = '';
}





