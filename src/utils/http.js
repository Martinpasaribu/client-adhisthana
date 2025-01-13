import axios from 'axios';

// Konfigurasi untuk server lokal
export const axiosClient = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
});


// URL Main

// export const UrlMain = 'http://localhost:5001'
export const UrlMain = 'https://adhistahan-serve.vercel.app'



// Konfigurasi untuk server HTTP lain 
// export const http = axios.create({
//   baseURL: 'http://localhost:5001/api/v1',
//   withCredentials: true,
// });

export const http = axios.create({
  baseURL: 'https://adhistahan-serve.vercel.app/api/v1',
  withCredentials: true,
});

// Konfigurasi untuk RapidAPI IMDB
const options = {
  baseURL: 'https://imdb-top-100-movies.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '73c641987cmsh012d5fb40aeb84bp1ea436jsnc2b2e8193c87',
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
  },
};
export const apiMDB = axios.create(options);



