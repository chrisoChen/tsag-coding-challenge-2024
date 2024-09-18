import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

let MovieItem = ({ movies = [], response, totalResults }) => {
  const mappedMovies = movies.map((movie) => (
    <article
      key={uuidv4()}
      className="mx-auto text-red-500 max-w-18 justify-self-end"
    >
      <div>
        <h1>{movie.Title}</h1>
        <p>{movie.Year}</p>
      </div>
      <div></div>
      <div>
        <img
          className="h-auto max-w-22 border-4 border-solid border-purple-300 "
          src={movie.Poster}
          alt=""
        />
      </div>
    </article>
  ));

  return movies ? (
    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4 flex-wrap content-center">
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
