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
loader.classList.add('is-hidden');

form.addEventListener('submit', onSearch);
loader.addEventListener('click', onLoading);



 async function onSearch(event) {
  event.preventDefault();
  clearGalleryContainer(); 
  pixabayApiServise.q = event.currentTarget.elements.searchQuery.value.trim();


if (!pixabayApiServise.q) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.');
    loader.classList.add('is-hidden');
   return;  
};


pixabayApiServise.resetPage();

try {
  const hits = await pixabayApiServise.fechPixabayApi();

   appendHitsMarkup(hits);

loader.classList.remove('is-hidden');

        if (pixabayApiServise.totalImages){
            Notify.success(`Hooray! We found ${pixabayApiServise.totalImages} images.`);
          }
        else if (pixabayApiServise.totalImages < pixabayApiServise.perPage){
        loader.classList.add('is-hidden');
       } else {
          Notify.failure("Sorry, nothing was found for your request");
                  loader.classList.add('is-hidden');
        return;
       }

} catch (error) {
  console.log(error);
}
lightbox.refresh();

}


async function onLoading(){
 try {
  const hits = await pixabayApiServise.fechPixabayApi();
  appendHitsMarkup(hits);
  if (pixabayApiServise.page > pixabayApiServise.totalPages) {
    Notify.failure("We're sorry, but you've reached the end of search results.");
   loader.classList.add("is-hidden");
 
  }
 } catch (error) {
  console.log(error);
 }

}





function appendHitsMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', hitsHbs(hits));
  lightbox.refresh();
}


function clearGalleryContainer() {
  gallery.innerHTML = '';
}





