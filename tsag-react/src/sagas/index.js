import { put, takeLatest, all } from "redux-saga/effects";
import { toast } from "react-toastify";

// Normally stored in .env file and set as an environment variable but left in for coding challenge
const apiKey = "4b7f2d72";

function* fetchMovies(action) {
  const json = yield fetch(
    `http://www.omdbapi.com/?s=${action.searchTerm}&apikey=${apiKey}`
  ).then((response) => response.json());

  yield put({ type: "MOVIES_RECEIVED", json: json });
}

function* saveMovies(action) {
  // Search for provided movies from our movies API
  const json = yield fetch(
    `http://www.omdbapi.com/?i=${action.imdbID}&apikey=${apiKey}`
  ).then((response) => response.json());

  // Format keys in ratings data to match DB model
  let ratingsLowercased = json.Ratings.map((rating) => {
    return Object.keys(rating).reduce((newObj, key) => {
      newObj[key.toLowerCase()] = rating[key];
      return newObj;
    }, {});
  });

  const data = {
    cookie_id: `${action.cookieID}`,
    title: json.Title,
    year: json.Year,
    rated: json.rated,
    released: new Date(json.Released),
    runtime: json.Runtime,
    genre: json.Genre,
    director: json.Director,
    writer: json.Writer,
    actors: json.Actors,
    plot: json.Plot,
    language: json.Language,
    country: json.country,
    awards: json.Awards,
    poster: json.Poster,
    ratings: ratingsLowercased,
    metascore: json.Metascore,
    imdb_rating: json.imdbRating,
    imdb_votes: json.imdbVotes,
    imdb_id: json.imdbID,
    type: json.Type,
    dvd: json.DVD,
    box_office: json.BoxOffice,
    production: json.Production,
    website: json.Website,
  };

  fetch("http://127.0.0.1:8000/movies/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      toast(`Successfully saved ${data.title}.`);
    })
    .catch((error) => {
      let errorMessage = `Error:${error}`;

      toast.error("errorMessage");
      throw new Error(errorMessage);
    });

  if (action.limitReached)
    toast(`Limit of ${action.maxMovies} reached for saving movies!`);

  yield put({ type: "MOVIES_SAVED", imdbID: action.imdbID });
}

function* getStoredMovies(action) {
  const json = yield fetch(`http://127.0.0.1:8000/movies/${action.cookieId}`)
    .then((response) => response.json())
    .catch((err) => {
      toast(`Error: something bad happened when retrieving your saved movies.`);
      console.log(err);
    });
  yield put({ type: "GET_STORED_MOVIES_COMPLETE", savedMoviesDB: json });
}

function* deleteMovie(action) {
  const json = yield fetch(
    `http://127.0.0.1:8000/movies/${action.imdbID}/delete/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json)
    .then((data) => {
      toast(`Deleted the movie!`);
    })
    .catch((err) => {
      toast("Error: couldn't delete the movie.");
      throw new Error();
    });

  yield put({ type: "MOVIES_DELETED", imdbID: action.imdbID });
}

function* actionWatcher() {
  yield takeLatest("GET_MOVIES", fetchMovies);
}

function* saveMovieWatcher() {
  yield takeLatest("SAVE_MOVIES", saveMovies);
}

function* getStoredMoviesWatcher() {
  yield takeLatest("GET_STORED_MOVIES", getStoredMovies);
}

function* deleteMovieWatcher() {
  yield takeLatest("DELETE_MOVIE", deleteMovie);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
    saveMovieWatcher(),
    getStoredMoviesWatcher(),
    deleteMovieWatcher(),
  ]);
}
