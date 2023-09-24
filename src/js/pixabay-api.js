
import axios from "axios";


 
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38889342-5ce4404b11b66a6cbf3138ed8";
export default class PixabayApiServise{

constructor () {

 this.q = '';
 this.page = 1;
 this.per_page = 40;
 this.totalHits = 0;
 this.totalImages = 0;
}

async fechPixabayApi(){
  const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${this.q}&page=${this.page}&per_page=${this.per_page}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    this.incrementPage();
    this.totalImages = data.totalHits;
    this.totalPages = Math.ceil(this.totalImages / this.per_page);
   console.log(data);
    return data.hits;
  } catch (error) {
    console.log(error);
}
}

incrementPage() {
    this.page += 1;
   }
   
   resetPage() {
    this.page = 1;
   }
   
   get query() {
    return this.q;
   }
   
   set query(newQuery) {
    this.q = newQuery;
   }


}
