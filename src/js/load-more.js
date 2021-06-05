//* щоб зрозуміти що тут відбувається потрібно включити повільний інтернет!!!!

import refs from './refs';
const LOADING = ['L','O','A','D','I','N','G'];
let text = 'L';
let timeoutIdArray = [];
let intervalId;
export function loadMore(e) {
    refs.loadMore.hidden = false;
    refs.loadMore.textContent = text;
    startLoading();
    intervalId = setInterval(()=> startLoading(),`${LOADING.length}00`)

}

function startLoading(params) {
    text = 'L';
    for (let i = 1; i < LOADING.length; i += 1) {
      const timeoutId = setTimeout(load, `${i}00`, i);
        timeoutIdArray.push(timeoutId);
    }
}

function load(i) {
    text = text + LOADING[i];
    refs.loadMore.textContent = text;
}

export function loadEnd() {
    timeoutIdArray.forEach((id)=>clearTimeout(id));
    timeoutIdArray = [];
    clearInterval(intervalId);
    refs.loadMore.textContent ='download more';
    return;
}

