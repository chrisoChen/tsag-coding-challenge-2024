import SearchButton from "../components/SearchButton";
import Loading from "../components/Loading";
import MovieItem from "../components/MovieItem";
function Search() {
  return (
    <div>
      <SearchButton />
      <Loading />
      <MovieItem />
    </div>
  );
}

export default Search;
