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
  // Get more data to save movies in database
  const json = yield fetch(
    `http://www.omdbapi.com/?i=${action.imbdID}&apikey=${apiKey}`
  ).then((response) => response.json());

  console.log(json);

  // TODO: Save movie to database
  yield put({ type: "MOVIES_SAVED", imdbID: action.imbdID });

  toast(`${json.Title} has been saved!`);
}

function* actionWatcher() {
  yield takeLatest("GET_MOVIES", fetchMovies);
}

function* saveMovieWatcher() {
  yield takeLatest("SAVE_MOVIES", saveMovies);
}

export default function* rootSaga() {
  yield all([actionWatcher(), saveMovieWatcher()]);
}
