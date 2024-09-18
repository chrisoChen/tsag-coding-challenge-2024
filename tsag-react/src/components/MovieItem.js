import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

let MovieItem = ({ movies = [], response, totalResults }) => {
  const dispatch = useDispatch();

  const saveMovie = (event) => {
    const imbdID = event.target.getAttribute("data-imbdid");
    dispatch({ type: "SAVE_MOVIES", imbdID: imbdID });
  };

  const mappedMovies = movies.map((movie) => (
    <article
      key={uuidv4()}
      className="mx-auto text-red-500 max-w-15 w-3/5 justify-self-end flex flex-col items-center gap-2"
    >
      <div className="text-center">
        <h1>{movie.Title}</h1>
        <p className="">({movie.Year})</p>
      </div>
      <div></div>
      <div>
        <img
          className="h-auto max-w-22 border-4 border-solid border-purple-300 "
          src={movie.Poster}
          alt=""
          data-imbdid={movie.imdbID}
        />
      </div>
      <div>
        <button
          data-imbdid={movie.imdbID}
          onClick={saveMovie}
          className="text-white text-sx sm:text-sm p-2 w-12 sm:w-20  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
});

MovieItem = connect(mapStateToProps, null)(MovieItem);

export default MovieItem;
