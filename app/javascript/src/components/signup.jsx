import React from "react";
import "../styles.scss";
import ReactDOM from "react-dom";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import { Element } from "react-scroll";
import Scroll from "react-scroll";
let Link = Scroll.Link;

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: undefined,
    successMessage: "",
    failureMessage: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signup = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetch(
      "/api/users",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        console.log(data);

        if (data.success !== false) {
          this.setState({
            error: false,
            successMessage: "Signup successfull! You can login now.",
          });
        } else {
          this.setState({
            error: true,
            failureMessage:
              "Signup failed. Please check if your email address is correct and your password has at least 8 characters.",
          });
        }
      });
  };

  render() {
    const {
      email,
      password,
      username,
      error,
      successMessage,
      failureMessage,
    } = this.state;
    let message;

    if (error == undefined) {
      message = <p></p>;
    } else if (error == true) {
      message = <p className="text-danger mt-2">{failureMessage}</p>;
    } else if (error == false) {
      message = <p className="text-primary mt-2">{successMessage}</p>;
    }

    return (
      <React.Fragment>
        <div className="border_signup">
          <form onSubmit={this.signup}>
            <h3>
              <Element id="signup-destination" name="signup-destination">
                SIGNUP
              </Element>
            </h3>
            <input
              name="username"
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              required
            />
            <input
              name="email"
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              required
            />
            <input
              name="password"
              type="password"
              className="form-control form-control-lg mb-3"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <button type="submit" className="btn btn-danger btn-block btn-lg">
              Sign up
            </button>
            {message}
          </form>
          <hr />
          <p className="mb-0">
            Already have an account?{" "}
            <a className="text-primary">
              <Link to="login-destination">Log in</Link>
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
