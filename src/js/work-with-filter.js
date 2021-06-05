import refs from './refs';

refs.filterButton.addEventListener('click', openCloseFilter);

function openCloseFilter(e) {
    e.target.textContent = !refs.filterList.hidden ? 'Open filter' : 'Close filter';
    refs.filterList.hidden = !refs.filterList.hidden ? true : false;
    refs.filterList.classList.toggle('list-of-filter');
}

export function readFilter(params) {
   const type = refs.typePhotos.value;
   const categories = refs.categoriesPhotos.value;
   const orientation = refs.orientationPhotos.value;
   const popularity = refs.popularityPhotos.value;
   return {type, orientation, categories, popularity}
}