import React, { useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import MovieCard from "./MovieCard";

let MyMovieItem = ({ savedMovies = [], savedMoviesDB = [] }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies("userId");

  const deleteMovie = (event) => {
    const imdbID = event.target.getAttribute("data-imdbid");
    dispatch({
      type: "DELETE_MOVIE",
      imdbID: imdbID,
      cookieID: cookies.userId,
    });
  };

  const mappedMovies = savedMoviesDB.map((movie) => (
    <article
      key={uuidv4()}
      className="mx-auto text-red-500 max-w-15 w-3/5 justify-self-end flex flex-col items-center gap-2"
    >
      <MovieCard
        title={movie.title}
        year={movie.year}
        poster={movie.poster}
        imdb={movie.imdb_id}
      />
      <div>
        <button
          type="button"
          data-imdbid={movie.imdb_id}
          onClick={deleteMovie}
          className="text-white text-sx sm:text-sm p-2 w-15 sm:w-20  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-30"
        >
          Delete
        </button>
      </div>
    </article>
  ));

  return mappedMovies.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4 flex-wrap content-center">
      {mappedMovies}
    </div>
  ) : (
    <h1>You Have no Saved Movies</h1>
  );
};

const mapStateToProps = (state) => ({
  savedMovies: state.savedMovies,
  savedMoviesDB: state.savedMoviesDB,
});

MyMovieItem = connect(mapStateToProps, null)(MyMovieItem);

export default MyMovieItem;
