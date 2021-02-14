import axios from 'axios';

export const soccerServer = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});