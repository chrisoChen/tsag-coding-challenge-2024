import SearchMovies from "../components/SearchMovies";
import Loading from "../components/Loading";
import SearchMovieItem from "../components/SearchMovieItem";
function Search() {
  return (
    <div>
      <div className="dark:border-gray-700 border-2  rounded-lg p-4">
        <SearchMovies />
      </div>
      <Loading />
      <div className="mb-4"></div>
      <SearchMovieItem />
    </div>
  );
}

export default Search;
