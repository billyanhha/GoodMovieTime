const axios = require("axios");

const API_KEY = "7345489e9522a18a9b84bbc90f4d7758";
const key = "6f2eee009c04b0d0bb32eba6fb3cb10e";

const getCurrentLanguage = () => new Promise((resolve, reject) => {
})


const getMovieDataById = (movieId) =>
  new Promise((resolve, reject) => {
    axios
      .get('http://api.ipstack.com/check?access_key=6f2eee009c04b0d0bb32eba6fb3cb10e&format=1')
      .then(data => {
        const language = data.data.location.languages[0].code;
        const URI = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${language}`;
        axios
          .get(URI)
          .then(data =>
            resolve({
              genres: data.data.genres,
              homepage: data.data.homepage,
              id: data.data.id,
              overview: data.data.overview,
              backPosterUri: "https://image.tmdb.org/t/p/w500" + data.data.backdrop_path,
              posterUri: "https://image.tmdb.org/t/p/w500" + data.data.poster_path,
              release_date: data.data.release_date,
              title: data.data.title,
              vote_average: data.data.vote_average
            })
          )
          .catch(err => reject(err));
      })
      .catch(err => reject(err))
  });

const getCreditsDataById = movieId =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
    axios
      .get(URI)
      .then(data => {
        const actor = data.data.cast.map(value => {
          let obj = {};
          obj.character = value.character;
          obj.name = value.name;
          obj.profileUri =
            "https://image.tmdb.org/t/p/w500" + value.profile_path;
          return obj;
        });
        resolve({ actor: actor });
      })
      .catch(err => reject(err));
  });

const getMovieById = (movieId) =>
  Promise.all([getMovieDataById(movieId), getCreditsDataById(movieId)]);

const getMovieByName = content =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${content}`;
    axios
      .get(URI)
      .then(
        result =>
          result.data.results
            ? resolve(
              result.data.results.map(element => {
                const obj = {};
                obj.id = element.id;
                obj.posterUri =
                  "https://image.tmdb.org/t/p/w500" + element.poster_path;
                obj.title = element.title;
                obj.title = element.title === element.original_title ? element.title :
                  element.original_title + " (" + element.title + ")";
                obj.title += " (" + element.release_date.substr(0, 4) + ")";
                obj.release_date = element.release_date;
                obj.vote_average = element.vote_average;
                obj.overview = element.overview;
                obj.original_language = element.original_language
                return obj;
              })
            )
            : resolve({})
      )
      .catch(err => reject(err));
  });

const getMovieByCredits = content =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${content}`;
    axios
      .get(URI)
      .then(result => {
        if (!result.data.results) resolve({});
        const arrays = result.data.results.map(value =>
          value.known_for.map(kValue => {
            let obj = {};
            obj.id = kValue.id;
            obj.posterUri =
              "https://image.tmdb.org/t/p/w500" + kValue.poster_path;
            obj.title = kValue.title;
            obj.release_date = kValue.release_date;
            obj.vote_average = kValue.vote_average;
            obj.overview = kValue.overview;
            obj.original_language = kValue.original_language
            return obj;
          })
        );
        var data = [];
        for (let i = 0; i < arrays.length; i++) {
          if (arrays[i][0]) data.push(arrays[i][0]);
          if (arrays[i][1]) data.push(arrays[i][1]);
          if (arrays[i][2]) data.push(arrays[i][2]);
        }
        resolve(data);
      })
      .catch(err => reject(err));
  });

const getMovieByContent = content =>
  Promise.all([getMovieByName(content), getMovieByCredits(content)]);

const getHomepageById = movieId =>
  new Promise((resolve, reject) => {
    const URI = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    axios
      .get(URI)
      .then(data =>
        resolve(
          data.data.homepage
            ? data.data.homepage
            : `https://www.google.com.vn/search?query=${data.data.title}`
        )
      )
      .catch(err => reject(err));
  });

module.exports = {
  getMovieById,
  getMovieByContent,
  getHomepageById,
  getCurrentLanguage
};
