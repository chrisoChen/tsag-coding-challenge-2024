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
        imdbID: action.imdbID,
        cookiesID: action.cookieID,
      };
    case "MOVIES_SAVED":
      if (state.savedMovies && !(action.imdbID in state.savedMovies))
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
    case "DELETE_MOVIE":
      return {
        ...state,
        imdbID: action.imdbID,
        cookieID: action.cookieID,
      };
    case "MOVIES_DELETED":
      const newSavedMoviesDB = state.savedMoviesDB.filter(
        (item) => item.imdb_id !== action.imdbID
      );

      const newSavedMovies = { ...state.savedMovies };
      delete newSavedMovies[action.imdbID];

      return {
        ...state,
        savedMoviesDB: newSavedMoviesDB,
        savedMovies: newSavedMovies,
      };
    default:
      return state;
  }
};
export default reducer;
