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
    default:
      return state;
  }
};
export default reducer;
