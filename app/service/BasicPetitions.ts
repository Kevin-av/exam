import axios from 'axios'
const baseUrl = 'http://192.168.18.94:8081';

const fetchFilms=async ()=>{
  return await axios.get(`${baseUrl}/films`);
}