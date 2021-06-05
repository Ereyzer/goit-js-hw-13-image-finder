const basicLightbox = require('basiclightbox');
import refs from './refs';


refs.gallery.addEventListener('click', openModal);

function openModal(e) {
    // console.log(e.target.nodeName === 'IMG', e.target)
    if (e.target.nodeName !== 'IMG') {
        return;
            
    }
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.images}" width="800" height="600">
    `)

    instance.show()

}