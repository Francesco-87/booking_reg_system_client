import axios from 'axios';
//const BASE_URL = 'http://localhost:3001';
 const BASE_URL = 'https://d3kh9fu01k6di6.cloudfront.net';


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});