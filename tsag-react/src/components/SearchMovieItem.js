import React, { useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import MovieCard from "./MovieCard";

let MovieItem = ({ movies = [], savedMovies = {}, response, totalResults }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies("userId");

  const saveMovie = (event) => {
    const imdbID = event.target.getAttribute("data-imdbid");
    dispatch({ type: "SAVE_MOVIES", imdbID: imdbID, cookieID: cookies.userId });
  };

  const maxMovies = 5;
  const limitReached = Object.keys(savedMovies).length >= maxMovies;

  useEffect(() => {
    if (limitReached) toast(`Limit of ${maxMovies} reached for saving movies!`);
  }, [limitReached]);

  const mappedMovies = movies.map((movie) => (
    <article
      key={uuidv4()}
      className="mx-auto text-red-500 max-w-15 w-3/5 justify-self-end flex flex-col items-center gap-2"
    >
      <MovieCard
        title={movie.Title}
        year={movie.Year}
        poster={movie.Poster}
        imdbID={movie.imdbID}
      />
      <div>
        <button
          title={
            limitReached
              ? `Can only save ${maxMovies} movies`
              : movie.imdbID in savedMovies
              ? `Movie already saved`
              : `Save ${movie.Title}`
          }
          type="button"
          data-imdbid={movie.imdbID}
          onClick={saveMovie}
          disabled={`${movie.imdbID}` in savedMovies || limitReached}
          className="text-white text-sx sm:text-sm p-2 w-12 sm:w-20  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-30"
        >
          Save
        </button>
      </div>
    </article>
  ));

  return movies ? (
    <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4 flex-wrap content-center">
      {mappedMovies}
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  response: state.response,
  totalResults: state.totalResults,
  savedMovies: state.savedMovies,
});

MovieItem = connect(mapStateToProps, null)(MovieItem);

export default MovieItem;
