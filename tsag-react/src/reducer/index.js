const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, loading: true, searchTerm: action.searchTerm };
    case "MOVIES_RECEIVED":
      return {
        ...state,
        movies: action.json.Search,
        totalResults: action.json.totalResults,
        response: action.json.Response,
        loading: false,
      };
    case "SAVE_MOVIES":
      return {
        ...state,
        imbdID: action.imdbID,
      };
    case "MOVIES_SAVED":
      if (state.savedMovies && !(action.imbdID in state.savedMovies))
        return {
          ...state,
          savedMovies: {
            ...state.savedMovies,
            [action.imdbID]: action.imdbID,
          },
        };
      else return state;
    case "GET_STORED_MOVIES":
      return {
        ...state,
        cookieID: action.cookieID,
      };
    case "GET_STORED_MOVIES_COMPLETE":
      let extractedDBMovies = action.savedMoviesDB.reduce((acc, current) => {
        acc[current.imdb_id] = current.imdb_id;
        return acc;
      }, {});

      return {
        ...state,
        savedMoviesDB: action.savedMoviesDB,
        savedMovies: {
          ...state.savedMovies,
          ...extractedDBMovies,
        },
      };
    default:
      return state;
  }
};
export default reducer;
