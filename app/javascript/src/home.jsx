import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import About from "./components/about";
import Login from "./components/login";
import Signup from "./components/signup";

function Home () {

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
 

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
