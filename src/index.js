import Axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayService from './js/components/pixabay';
import { createCards } from './js/components/photo_card'
// import LoadMoreButton from './js/components/load_more_button'

const searchText = document.querySelector('input');
const searchButton = document.querySelector('button');
const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery')
const title = document.querySelector('.counter');

let totalHits = 0;

const pixabayService = new PixabayService();
// const loadMoreButton = new LoadMoreButton({ 
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });

loadMoreButton.addEventListener('click', onLoadMore);

searchForm.addEventListener('submit', onSearch);

// let searchQuery = '';

// loadMoreButton.show();

// loadMoreButton.classList.add('is-hidden');


function onSearch(e) {
    e.preventDefault();
    
    pixabayService.query = e.currentTarget.elements.searchQuery.value.trim();
    if(pixabayService.query === '') {
        return noInfoForSearch();
    }
    pixabayService.resetPage();

    pixabayService.fetchArticles()
    .then (hits => {
        clearFormGallery(),
        // pixabayService.resetPage();
        // searchButton.disabled = true,
        createCards(hits);
        const lightbox = new SimpleLightbox(".gallery a", 
        {
            captionDelay: 250,
        });

        addTotalInfoCounter();

        if (pixabayService.totalHits === 0) {
            console.log('no info');
            alertNoContentFound()
        }

        function addTotalInfoCounter () {
            Notiflix.Notify.success(`Hooray! We found ${pixabayService.totalHits} images.`);
        }

        // } else {
        //     // createCards(hits);
        //     // const lightbox = new SimpleLightbox(".gallery a", 
        //     // {
        //     //     captionDelay: 250,
        //     // });
        //     addTotalInfoCounter() 
        // } 
        // clearFormGallery();
})
.catch(error => console.log(error))
}

function onLoadMore () {
    pixabayService.fetchArticles().then(createCards);
}

function clearFormGallery() {
gallery.innerHTML = '';
}



//Notiflix

function addTotalInfoCounter () {
    Notiflix.Notify.success(`Hooray! We found ${pixabayService.totalHits} images.`);
}

function noInfoForSearch () {
    Notiflix.Notify.failure('Please specify your search query.')
}

function endOfContent () {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
}

function alertNoContentFound () {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}