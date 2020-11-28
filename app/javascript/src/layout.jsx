import React from "react";
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this); 
  }

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
        });
      });
  }

  handleClick() {
    fetch("/api/logout")
      .then(handleErrors)
      .then(function (data) {
        console.log(data);
      //  window.location = "/";
      });
  }

  handleClick2() {
    window.location = "/myfeeds";
  }

  handleClick3() {
    window.location = "/feedpage";
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <a href="/">
              <span className="navbar-brand mb-0 h1">
                <i class="fab fa-twitter fa-2x"></i>Twitter Clone
              </span>
            </a>
            <div className="collapse navbar-collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <span>Language: English</span>
                </li>
              </ul>
            </div>
          </nav>
          <div>{this.props.children}</div>
          <footer className="p-3 bg-light">
            <div>
              <span className="mr-3 text-secondary">
                Built by Joanna Kochanowska 2020
              </span>
            </div>
          </footer>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <a href="/">
              <span className="navbar-brand mb-0 h1">
                <i class="fab fa-twitter fa-2x"></i>Twitter Clone
              </span>
            </a>
            <div className="collapse navbar-collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button
                    className="btn btn-danger float-right buttons"
                    id="log-out"
                    onClick={this.handleClick}
                  >
                    Log Out
                  </button>
                  <button
                    className="btn btn-secondary float-right buttons"
                    onClick={this.handleClick2}
                  >
                    See only my feeds
                  </button>
                  <button
                    className="btn btn-secondary float-right buttons"
                    onClick={this.handleClick3}
                  >
                    See all feeds
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          <div>{this.props.children}</div>
          <footer className="p-3 bg-light">
            <div>
              <span className="mr-3 text-secondary">
                Built by Joanna Kochanowska 2020
              </span>
            </div>
          </footer>
        </React.Fragment>
      );
    }
  }
}

export default Layout;
