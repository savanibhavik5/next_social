import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Captcha from "./Captch";
import { useRouter } from "next/router";

const Registration = () => {
  const [input, setInput] = useState({
    fullname: "",
    password: "",
    email: "",
    gender: "",
  });
  const router = useRouter();
  const [msg, setMsg] = useState("");
  let [verified, setVerified] = useState(false);

  const [inputFocus, setInputFocus] = useState({
    fullname: false,
    password: false,
    email: false,
    dob: false,
  });

  const handleInputFocus = (name, isFocused) => {
    setInputFocus({ ...inputFocus, [name]: isFocused });
  };

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const signup = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      "http://localhost:1234/user?email=" + input.email
    );
    const data = await res.data;
    const isRegistered = data.find((user) => user.email === input.email);
    if (
      [
        input.fullname &&
          passwordRegex.test(input.password) &&
          emailRegex.test(input.email) &&
          input.gender &&
          input.dob,
      ] == ""
    ) {
      alert("Please enter All Detail Properly");
    } else if (isRegistered) {
      setMsg(
        input.fullname + " this Email:- " + input.email + " already registered "
      );
      // console.log(isRegistered);
    } else {
      var userdata = {
        fname: input?.fullname,
        email: input?.email,
        password: input?.password,
        gender: input?.gender,
        dob: input?.dob,
        id: uuidv4(),
      };
      var url = "http://localhost:1234/user";
      var postoption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      };
      fetch(url, postoption)
        .then((response) => response.json())
        .then((serRes) => {
          // setUsers(serRes);

          setMsg(
            input.fullname + " Your Account Created Successfully, Login Now "
          );
          setTimeout(() => router.push("/Components/Login"));
        }, 1000);
    }
  };
  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
    // You can perform any validation or store the Captcha value in your state
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <p className="text-center text-success h3 ">{msg}</p>
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={signup}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            required
                            type="text"
                            id="form3Example1c"
                            className="form-control border"
                            autoComplete="off"
                            name="fullname"
                            onChange={onChange}
                            value={input.fullname}
                            // onFocus={() => handleInputFocus("fullname", true)}
                            // onBlur={() => handleInputFocus("fullname", false)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            required
                            type="email"
                            id="form3Example3c"
                            autoComplete="off"
                            name="email"
                            className="form-control border"
                            onChange={onChange}
                            value={input.email}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            required
                            name="password"
                            type="password"
                            autoComplete="off"
                            id="form3Example4c3"
                            className="form-control border"
                            onChange={onChange}
                            value={input.password}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c3"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-cake-candles fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            required
                            name="dob"
                            type="date"
                            autoComplete="off"
                            id="form3Example4c7"
                            className="form-control border"
                            onChange={onChange}
                            value={input.dob}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c7"
                          ></label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-person-half-dress fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill ">
                          <div className=" d-flex justify-content-start  align-items-start ">
                            <label
                              className="font-weight-bold text-left "
                              htmlFor="form3Example4cd"
                            >
                              Gender
                            </label>
                            <div className=" mx-4">
                              <input
                                required
                                id="form3Example4cd"
                                type="radio"
                                name="gender"
                                className="form-check-input mx-1"
                                onChange={onChange}
                                value="male"
                              />
                              :Male
                              <br />
                              <input
                                required
                                type="radio"
                                name="gender"
                                className="form-check-input mx-1"
                                onChange={onChange}
                                value="female"
                              />
                              :Female
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          required
                          className="form-check-input me-2"
                          type="checkbox"
                          name="term"
                          id="form2Example3cc"
                          onChange={onChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3cc"
                        >
                          I agree all statements in
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <ReCAPTCHA
                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          onChange={handleCaptchaChange}
                          // 6LdqclUmAAAAAOUPNWTYhjj0RHYpKHx4p7Kg5yru
                        />
                        {/* <Captcha onChange={handleCaptchaChange} /> */}
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={
                            !verified ||
                            input.fullname == "" ||
                            passwordRegex.test(input.password) == "" ||
                            emailRegex.test(input.email) == "" ||
                            input.gender == "" ||
                            input.dob == ""
                          }
                        >
                          Register
                        </button>
                      </div>
                      <div className="d-flex justify-content-center  align-items-center mx-4 mb-3 mb-lg-4">
                        Already Register?
                        <button className="btn btn-lg mx-2">Login</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
