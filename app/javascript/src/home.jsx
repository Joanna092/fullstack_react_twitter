import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import About from "./components/about";
import Login from "./components/login";
import Signup from "./components/signup";
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Home extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  };

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
        });
      });
  }

  toggle = () => {
    this.setState({
      show_login: !this.state.show_login,
    });
  };

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      window.location = "/feedpage";
    }
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <About />
            </div>
            <div className="col-xs-12 col-sm-6">
              <Login />
              <Signup />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
