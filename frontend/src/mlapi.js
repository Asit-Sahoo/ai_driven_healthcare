import axios from "axios";

const ML_API = axios.create({
  baseURL: process.env.REACT_APP_ML_API_URL,
});

export default ML_API;