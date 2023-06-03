import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getSingleUser, setSingleUser } from "../redux/actions";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Head from "next/head";

const initialValues = { email: "", password: "" };
const Login = () => {
  let [verified, setVerified] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const handleCaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    setVerified(true);
  };
  const loginvalidator = Yup.object({
    email: Yup.string().email().required("Please Enter Valid Email"),
    password: Yup.string().min(6).required("please Enter Valid Password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginvalidator,

    onSubmit: (values) => {
      dispatch(getSingleUser(values));
      formik?.resetForm();
    },
  });
  const login = async (e) => {
    e.preventDefault();
    if (formik?.values?.email === "" || formik?.values?.password === "") {
      setMsg("Please Enter Your Detail Properly");
    } else {
      const res = await axios.get(
        "http://localhost:1234/user?email=" +
          formik?.values?.email +
          "&password=" +
          formik?.values?.password
      );
      const data = await res.data;
      // console.log(data);
      if (data.length === 0) {
        setMsg("Email Not Found In Our Database Please Register First");
      } else {
        setMsg("Please Wait Redirecting To Your Account");
        localStorage.setItem("userdetail", JSON.stringify(data));

        dispatch(setSingleUser(data[0]));
        router.push("/Components/Index");
      }
      //   dispatch(getUserDetail(userinfo));
    }
  };
  return (
    <div>
      <Head> Login</Head>
      <section className="background-radial-gradient overflow-hidden">
      
        <section className="bg-light ">
          <div className="container-fluid h-custom">
            <div className="row min-vh-100 d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 bg-glass  p-3 rounded">
                <form
                  onSubmit={login}
                >
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal text-dark mb-0 me-3">
                      Sign In With
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-floating text-dark bg-primary mx-1"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                  </div>
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center  text-dark fw-bold mx-3 mb-0">
                      Or
                    </p>
                  </div>
                  <div className="text-danger h5 text-center">{msg}</div>
                  <div className=" mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      value={formik?.values?.email}
                      onChange={formik?.handleChange}
                      onBlur={formik?.onBlur}
                      name="email"
                      className="form-control form-control-lg border"
                      placeholder="Enter a valid email address"
                    />
                    {formik?.errors?.email && formik?.touched?.email ? (
                      <p className="form-error">{formik?.errors?.email}</p>
                    ) : null}
                  </div>
                  <div className=" mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg border"
                      placeholder="Enter password"
                      name="password"
                      value={formik?.values?.password}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label
                        className="form-check-label text-dark"
                        htmlFor="form2Example3"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>
                  <div className="form-check d-flex justify-content-center my-5">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleCaptchaChange}
                      // 6LdqclUmAAAAAOUPNWTYhjj0RHYpKHx4p7Kg5yru
                    />
                  </div>
                  <div className="text-center  mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary bg-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      disabled={
                        formik?.values?.email === "" ||
                        formik?.values?.password === ""
                      }
                    >
                      Login
                    </button>
                    <p className="small fw-bold text-dark mt-2 pt-1 mb-0">
                      Don't have an account?
                      <Link
                        href="/Components/Registration"
                        className="link-danger"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row text-center fixied-bottom text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>

            <div>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Login;
