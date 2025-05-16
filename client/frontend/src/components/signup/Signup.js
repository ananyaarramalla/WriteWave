import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  let [state, setState] = useState(false);
  let [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    try {
      let res = null;
      if (userObj.userType === "author") {
        res = await axios.post("http://localhost:4000/author-api/author", userObj);
      } else if (userObj.userType === "user") {
        res = await axios.post("http://localhost:4000/user-api/user", userObj);
      }
      
      console.log(res);
      
      if (res && res.status === 201) {
        setState(true);
        setSignupSuccess(true);
        setErr("");
      } else if (res && res.status === 200) {
        setErr(res.data.message);
      } else {
        setErr("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data) {
        setErr(error.response.data.message);
      } else {
        setErr("Registration failed. Please try again later.");
      }
    }
  }
  
  return (
  <div className="container">
  <div className="row justify-content-center mt-5">
    <div className="col-lg-6 col-md-8 col-sm-10">
      <div className="card shadow">
        <div className="card-title text-center border-bottom">
          {signupSuccess === true ? (
            <div>
              <p className="pt-3 fs-3 text-center display-4 text-success success">
                Registration Successfull!!
              </p>
              <p className="text-center fs-6 text-secondary">
                Proceed to <Link to="/signin">Login</Link>
              </p>
              <p className="text-center fs-6 text-secondary">
                Back to <Link to="/">Home</Link>
              </p>
            </div>
          ) : (
            <h2 className="p-3">SignUp</h2>
          )}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                alt="Signup Image"
                className="signup-image img-fluid pt-5"
              />
            </div>
            <div className="col-md-6">
              {err.length !== 0 && (
                <p className="text-center text-danger">{err}</p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Register as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="author"
                      value="author"
                      {...register("userType", { disabled: state })}
                    />
                    <label
                      htmlFor="author"
                      className="form-check-label"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType", { disabled: state })}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ fontSize: "0.9rem" }}
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", { disabled: state }, { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", { disabled: state }, { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", { disabled: state }, { required: true })}
                  />
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-light"
                    style={{ backgroundColor: "#1A1412" }}
                    disabled={state}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Signup;
