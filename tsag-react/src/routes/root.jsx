import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../output.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

export default function Root() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["userId"]);

  useEffect(() => {
    // Generate a new UUID
    const newUserId = uuidv4();

    // Check if the cookie already exists
    if (!cookies.userId) {
      // Only set the cookie if it does not exist
      setCookie("userId", newUserId, { path: "/" });
    } else {
      console.log("Cookie already exists:", cookies.userId);
    }
  }, [cookies, setCookie]);

  useEffect(() => {
    dispatch({ type: "GET_STORED_MOVIES", cookieID: cookies.userId });
  }, [cookies.userId, dispatch]);

  return (
    <div>
      <SideBar />
    </div>
  );
}

export function SideBar() {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-labelledby="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={`search`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-target="default-sidebar"
                data-drawer-hide="default-sidebar"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>

                <span className="ms-3">Search Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to={`my-movies`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                data-drawer-target="default-sidebar"
                data-drawer-hide="default-sidebar"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">My Movies</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="sm:ml-64 p-4">
        <ToastContainer />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const contacts = await fetch("http://www.omdbapi.com/?apikey=4b7f2d72");

  if (contacts) return { contacts };
}
