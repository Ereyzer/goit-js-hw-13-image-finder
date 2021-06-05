import './sass/main.scss';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'
import './js/work-with-filter';
import refs from './js/refs';
import ApiService from './js/apiService';
import photoCardTempl from './templates/photoCardTempl.hbs';
import {loadMore, loadEnd} from './js/load-more';
import {readFilter} from './js/work-with-filter';
import './js/openModal';
import './js/scrollDownUp';
import {trackScroll} from './js/scrollDownUp';

const liInGalery = new Event("liInGalery", {"bubbles":true, "cancelable":false});


refs.searchButton.addEventListener('click', (e)=>e.preventDefault());
let searchQuery = '';

export const apiService = new ApiService(readFilter());


refs.form.addEventListener('change', (e)=>{
    const test = e.target === refs.input || e.target === refs.typePhotos 
              || e.target === refs.popularityPhotos || e.target === refs.orientationPhotos
              || e.target === refs.categoriesPhotos;
    if (test) {
        refs.searchButton.addEventListener('click', searchImages);
        refs.loadMore.addEventListener('click', nextImages)
        apiService.PAGE_COUNTER = 0;
    }
})

export function nextImages(e) {
    loadMore(e)
    withOrWithoutFilter(e);
}

async function searchImages(e) {
    searchQuery = refs.input.value;
    refs.searchButton.removeEventListener('click', searchImages);
    refs.gallery.innerHTML = '';
    loadMore(e);
    withOrWithoutFilter(e)
}

async function withOrWithoutFilter(e) {
    if(!refs.filterList.hidden){
        try {
            const response = await apiService.fetchImagesWithFilter({searchQuery, ...readFilter()})
            .then(notHaveThisquery)
            .then(renderHtml).then(eventLOadLI).finally(loadEnd)
          } catch (error) {
              console.log(error);
          }
          return;
    };

    try {
        const resp = await apiService.fetchImages(searchQuery).then(notHaveThisquery)
        .then(renderHtml).then(eventLOadLI).finally(loadEnd)
      } catch (error) {
          console.log(error);
      }

      return;
}

function renderHtml(response) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTempl(response));
    return response;
}

function notHaveThisquery(response){
        if (response.hits.length < 1) {
            refs.gallery.innerHTML = `<li><h1>sorry we do not have images with - ${searchQuery} </h1></li>`;
            throw new Error('not Exist');
        }
        if(response.hits.length < 12){
            apiService.MAX_PAGE = true;
            refs.loadMore.removeEventListener('click', nextImages);
        }
        return response;
}

function eventLOadLI(response) {
    const li = refs.gallery.querySelector('li');
    li.dispatchEvent(liInGalery);
    return response;
}
