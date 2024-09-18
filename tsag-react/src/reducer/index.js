const reducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, loading: true, searchTerm: action.searchTerm};
    case "MOVIES_RECEIVED":
      return {
        ...state,
        movies: action.json.Search,
        totalResults: action.json.totalResults,
        response: action.json.Response,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
