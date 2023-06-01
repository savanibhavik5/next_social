import "@/styles/globals.css";
import "../public/icon/css/all.css";
import { Provider, useDispatch, useSelector } from "react-redux";

import { wrapper } from "./redux/Store";
import { useEffect } from "react";
import { userLogin } from "./redux/actions";

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const getUser = useSelector((data) => data.user);
  useEffect(() => {
    dispatch(userLogin(getUser[0]));
  }, []);
  return (
    <Provider>
      <Component {...pageProps} />;
    </Provider>
  );
};

export default MyApp;
