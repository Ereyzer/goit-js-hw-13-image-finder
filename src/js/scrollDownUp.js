import refs from './refs';
import {apiService, nextImages} from '../index';
var _ = require('lodash');

window.addEventListener('scroll', _.throttle(trackScroll, 500));
refs.scrollUp.addEventListener('click', backToTop);
refs.scrollDown.addEventListener('click', scrollToBottom);

document.addEventListener('liInGalery', (e)=>{
    refs.scrollDown.hidden = false;
    refs.scrollDown.classList.add('scroll-down', 'material-icons');
});



 async function trackScroll(e) {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    const coordsEnd = document.body.scrollHeight;
    const test = coordsEnd - coords - 40;
    refs.scrollDown.hidden = scrolled > test ? true : false;
    refs.scrollDown.setAttribute('class', scrolled > test ? 'scroll-down' : 'scroll-down material-icons');
    refs.scrollUp.hidden = scrolled > coords ? false : true;
    refs.scrollUp.setAttribute('class', scrolled > coords ? 'scroll-up material-icons' : 'scroll-up');
    if(apiService.PAGE_COUNTER > 1){
        console.log(apiService.MAX_PAGE)
        if (apiService.MAX_PAGE) {
            refs.loadMore.textContent = 'That is all';
            return;
        }
        if(scrolled > test){
           await setTimeout(nextImages,100,e);
        }
    }
  }

  function backToTop() {
    refs.form.scrollIntoView({behavior: "smooth", block: "start"});
  }
  function scrollToBottom(e) {
    refs.loadMore.scrollIntoView({behavior: "smooth", block: "end"});
}
