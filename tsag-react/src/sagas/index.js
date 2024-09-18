import { put, takeLatest, all } from "redux-saga/effects";

function* fetchMovies(action) {
  // API key normally stored in .env file and set as an environment variable but left in for coding challenge
  const json = yield fetch(
    "http://www.omdbapi.com/?s=ship&apikey=4b7f2d72"
  ).then((response) => response.json());

  yield put({ type: "MOVIES_RECEIVED", json: json });
}

function* actionWatcher() {
  yield takeLatest("GET_MOVIES", fetchMovies);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
