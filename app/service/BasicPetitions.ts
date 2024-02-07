import axios from 'axios'
const baseUrl = 'http://10.10.2.44:8081';

const fetchFilms=async ()=>{
  return await axios.get(`${baseUrl}/films`);
}