import SearchMovies from "../components/SearchMovies";
import Loading from "../components/Loading";
import MovieItem from "../components/MovieItem";
function Search() {
  return (
    <div>
      <div className="dark:border-gray-700 border-2  rounded-lg p-4">
        <SearchMovies />
        <Loading />
      </div>
      <MovieItem />
    </div>
  );
}

export default Search;
