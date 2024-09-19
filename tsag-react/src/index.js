import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import MyMovies from "./routes/myMovies";
import Search from "./routes/search";
import reducer from "./reducer";
import { Provider } from "react-redux";
import { logger } from "redux-logger";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import { CookiesProvider } from "react-cookie";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: reducer,
  middleware: () => new Tuple(sagaMiddleware, logger),
  preloadedState: { savedMovies: {} },
});

sagaMiddleware.run(rootSaga);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "my-movies",
        element: <MyMovies />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
