import axios from "axios";
export default axios.create({
  baseURL : 'https://goodmovietime.herokuapp.com',
  withCredentials: true,
});

//http://localhost:6969

// https://goodmovietime.herokuapp.com
