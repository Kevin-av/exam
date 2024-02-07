import axios from 'axios'
const baseUrl = 'http://10.0.8.239:8081';

const fetchFilms=async ()=>{
  return await axios.get(`${baseUrl}/films`);
}