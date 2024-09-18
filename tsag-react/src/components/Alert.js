import { connect, useDispatch } from "react-redux";
import { Dismiss } from "flowbite";
import { useEffect } from "react";

let dismiss;
let Alert = ({ message = "", showAlert = false }) => {
  // target element that will be dismissed
  const dispatch = useDispatch();

  useEffect(() => {
    if (showAlert) setTimeout(() => dispatch({ type: "DISABLE_ALERT" }), 2000);
  }, [showAlert, dispatch]);

  return (
    <div className={`${showAlert ? visible : invisible}`}>
      <div
        id="targetAlert"
        className="absolute left-0 right-0 mx-auto ms-auto w-fit p-4 mt-4 text-sm z-50 text-blue-800 rounded-lg bg-blue-200 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        {message}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.movieTitle,
  showAlert: state.showAlert,
});

Alert = connect(mapStateToProps, null)(Alert);
export default Alert;
