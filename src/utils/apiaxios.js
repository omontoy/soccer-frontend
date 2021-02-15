import axios from 'axios';

export const soccerServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

export const apiFootball = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  headers: {
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY 
  }
})