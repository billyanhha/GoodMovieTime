import axios from "axios";
export default axios.create({
  baseURL : 'http://localhost:6969',
  withCredentials: true,
});

//http://localhost:6969

// https://goodmovietime.herokuapp.com
