function MovieCard({ title, year, poster, imdbID }) {
  return (
    <div>
      <div className="text-center">
        <h1>{title}</h1>
        <p className="">({year})</p>
      </div>
      <div></div>
      <div>
        <img
          className="h-auto max-w-22 border-4 rounded border-rounded"
          src={poster}
          alt=""
          data-imdb={imdbID}
        />
      </div>
    </div>
  );
}

export default MovieCard;
