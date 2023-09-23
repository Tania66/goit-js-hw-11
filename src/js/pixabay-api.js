
import axios from "axios";


 
export default class PixabayApiServise{

constructor () {

 this.q = '';
 this.page =1;
 this.per_page = 40;
}

async fechPixabayApi(){
const axiosOptions = {
 method: 'get',
 url: 'https://pixabay.com/api/',
 params: {
   key: '38889342-5ce4404b11b66a6cbf3138ed8',
   q: `${this.q}`,
   image_type: 'photo',
   orientation: 'horizontal',
   safesearch: true,
   page: `${this.page}`,
   per_page: `${this.per_page}`,
 },
};
try {
 const response = await axios(axiosOptions);

 const data = response.data;

 this.incrementPage();
 return data.hits;
} catch (error) {
 console.error(error);
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
