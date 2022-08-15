export default class PixabayService {
    constructor () {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const KEY = "29162955-32e71cd5a6cadb845e07a1aad";
        const url = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    
        return fetch(url)
        .then(r => r.json())            
        .then(data => {
            this.page += 1;
            return data.hits;
        }); 
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}