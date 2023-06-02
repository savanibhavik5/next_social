import "@/styles/globals.css";
import "../public/icon/css/all.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { wrapper, store } from "./redux/Store";
import { useEffect } from "react";
import { setUser } from "./redux/actions";
import Header from "./Components/Header";

const LocalStorageItem = () => {
  if (typeof window !== "undefined") {
    let userDetail = localStorage.getItem("fullname");
    if (userDetail) {
      return JSON.parse(localStorage.getItem(""));
    } else {
      return [];
    }
  } else {
    return [];
  }
};
const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const data = LocalStorageItem();
  const loading = useSelector((state) => state?.item?.loading);
  // const getUser = useSelector((data) => data.user);
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else {
      dispatch(setUser([]));
    }
  }, [data]);
  return (
    <><link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" /><script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>

      {loading == true ? (
        <div className="d-Flex align-items-center justify-content-center h-100">
          {" "}
          <Audio
            height="200"
            width="200"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
          <Provider store={store}>
            <Header/>
          <Component {...pageProps} />;
        </Provider>
      )}
    </>
  );
};

export default wrapper.withRedux(MyApp);
