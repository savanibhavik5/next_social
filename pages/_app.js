import "@/styles/globals.css";
import "../public/icon/css/all.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { wrapper, store } from "./redux/Store";
import { useEffect } from "react";
import { getPost, setSingleUser } from "./redux/actions";
import Header from "./Components/Header";
import { Head } from "next/document";
export const getStaticProps = async () => {
  const postdata = await fetch("http://localhost:1234/posts").then((res) =>
    res.json()
  );
  const commentsdata = await fetch("http://localhost:1234/comments").then(
    (res) => res.json()
  );
  return {
    props: {
      postdata,
      commentsdata,
    },
  };
}
const LocalStorageItem = () => {
  if (typeof window !== "undefined") {
    let userDetail = localStorage.getItem("userdetail");
    if (userDetail) {
      return JSON.parse(localStorage.getItem("userdetail"));
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
  const postsdata = useSelector((post) => post?.user?.allpost);
  useEffect(() => {
    if (data) {
      dispatch(setSingleUser(data));
    } else {
      dispatch(setSingleUser([]));
    }
  }, [data]);
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
        rel="stylesheet"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossOrigin="anonymous"
      ></script>

      {loading == true ? (
        <div className="d-Flex align-items-center justify-content-center h-100">
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
          <Header />
          <Component {...pageProps} />;
        </Provider>
      )}
    </>
  );
};

export default wrapper.withRedux(MyApp);
