import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import MyMovieItem from "../components/MyMovieItem";
import { useEffect } from "react";

function MyMovies() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    dispatch({ type: "GET_STORED_MOVIES", cookieID: cookies.userId });
  }, [cookies.userId, dispatch]);

  return (
    <div>
      <MyMovieItem />
    </div>
  );
}

export default MyMovies;
