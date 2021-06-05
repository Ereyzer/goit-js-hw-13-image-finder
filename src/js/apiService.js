

export default class ApiService  {
    BASE_KEY = '21932994-b9f805e2b70fd6b5c6454ae40';
    BASE_URL = 'https://pixabay.com/api/';
    PAGE_COUNTER = 0;
    MAX_PAGE = false;
    constructor({type, orientation, categories, popularity}){
        
        this.image_type = type, 
        this.orientation = orientation, 
        this.category = categories, 
        this.order = popularity

    }

    async fetchImages(q){
        this.PAGE_COUNTER = this.PAGE_COUNTER + 1;
      const response = await fetch(`${this.BASE_URL}?image_type=${this.image_type}&category=${this.category}&order=${this.order}&orientation=${this.orientation}&q=${q}&page=${this.PAGE_COUNTER}&per_page=12&key=${this.BASE_KEY}`);
      return await response.json();
    }

    fetchImagesWithFilter({searchQuery, type, orientation, categories, popularity}){
        this.image_type = type;
        this.orientation = orientation;
        this.category = categories;
        this.order = popularity;
        const q = searchQuery;
        console.log({q, type, orientation, categories, popularity});
        return this.fetchImages(q);
    }
    
    testFunction(){
        
    }
}