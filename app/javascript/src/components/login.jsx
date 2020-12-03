import React from "react";
import "../styles.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import { Element } from "react-scroll";
import Scroll from "react-scroll";
let Link = Scroll.Link;

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      error: "",
    });

    fetch(
      "/api/sessions",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success) {
          console.log("logged in");
          window.location = "/"
        }
      })

      .catch((error) => {
        this.setState({
          error: "Could not log in.",
        });
        console.log("not logged in");
      });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <React.Fragment>
        <div className="border_signup">
          <form onSubmit={this.login}>
            <h3>
              <Element id="login-destination" name="login-destination">
                LOGIN
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
              name="password"
              type="password"
              className="form-control form-control-lg mb-3"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <button type="submit" className="btn btn-danger btn-block btn-lg">
              Log in
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </form>
          <hr />
          <p className="mb-0">
            Don't have an account?{" "}
            <a className="text-primary">
              <Link to="signup-destination">Sign up</Link>
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
