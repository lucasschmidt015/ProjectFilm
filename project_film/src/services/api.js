import axios from "axios";


//base url: //https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=90c6ebf67bcab547668357ca7c7a40ae&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;