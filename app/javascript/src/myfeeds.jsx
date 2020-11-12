import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import Stats from "./components/stats";
import Myposts from "./components/myposts";
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Myfeeds extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Type your message here",
      user_tweets: [],
      authenticated: false,
      username: " ",
    };
    this.handleChange = this.handleChange.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
        });
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({
              user_tweets: data.tweets,
            });
          });
      });
  }

  onFocus = (e) => {
    this.setState({
      text: " ",
    });
  };

  newPost = (e) => {
    console.log("posted");
    if (e) {
      e.preventDefault();
    }
    this.setState({
      error: "",
    });

    fetch(
      "/api/tweets",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          tweet: {
            username: this.state.username,
            message: this.state.text,
          },
        }),
      })
    )
      .then(handleErrors)
      .catch((error) => {
        this.setState({
          error: "Could not add tweet",
        });
        console.log("Could not add tweet");
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_tweets: data.tweets });
          });
      });
  };

  deletePost(id) {
    console.log("deleted");
    fetch(
      `/api/tweets/${id}`,
      safeCredentials({
        method: "DELETE",
      })
    )
      .then(handleErrors)
      .catch((error) => {
        this.setState({
          error: "Could not delete tweet",
        });
        console.log("Could not delete tweet");
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_tweets: data.tweets });
          });
      });
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Stats
                username={this.state.username}
                user_tweets={this.state.user_tweets.length}
              />
            </div>
            <div className="col-9">
              <Myposts
                username={this.state.username}
                user_tweets={this.state.user_tweets}
                text={this.state.text}
                newPost={this.newPost}
                deletePost={this.deletePost}
                handleChange={this.handleChange}
                onFocus={this.onFocus}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Myfeeds />,
    document.body.appendChild(document.createElement("div"))
  );
});
