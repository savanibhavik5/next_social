import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/router";

const Login = () => {
  const [input, setInput] = useState({
    password: "",
    email: "",
  });
  let [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
    // You can perform any validation or store the Captcha value in your state
  };

  const login = async (e) => {
    e.preventDefault();
    if (input.email === "" || input.password === "") {
      setMsg("Please Enter Your Detail Properly");
    } else {
      const res = await axios.get(
        "http://localhost:1234/user?email=" +
          input.email +
          "&password=" +
          input.password
      );
      const data = await res.data;
      console.log(data);
      if (data.length === 0) {
        setMsg("Email Not Found In Our Database Please Register First");
      } else {
        setMsg("Please Wait Redirecting To Your Account");
        localStorage.setItem("fullname", data[0].fullname);
        localStorage.setItem("email", data[0].email);
        localStorage.setItem("id", data[0].id);
        router.push("/Components/Registration");
      }
      //   dispatch(getUserDetail(userinfo));
    }
  };
  return (
    <div>
      <section class="background-radial-gradient overflow-hidden">
        <style></style>
        <section className="bg-dark ">
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
                <form onSubmit={login}>
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
                      className="btn btn-primary btn-floating mx-1"
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
                  <div className=" mb-4">
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      onChange={onChange}
                      value={input.email}
                      name="email"
                      className="form-control form-control-lg border"
                      placeholder="Enter a valid email address"
                    />
                  </div>
                  <div className=" mb-3">
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      name="password"
                      onChange={onChange}
                      value={input.password}
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
                        for="form2Example3"
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
                  <div className="text-danger h5">{msg}</div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      disabled={input.email === "" || input.password === ""}
                    >
                      Login
                    </button>
                    <p className="small fw-bold text-dark mt-2 pt-1 mb-0">
                      Don't have an account?
                      <a href="#!" className="link-danger">
                        Register
                      </a>
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
