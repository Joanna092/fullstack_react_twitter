import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout";
import Stats from "./components/stats";
import Post from "./components/posts";
import { safeCredentials, handleErrors } from "./utils/fetchHelper";

class Feedpage extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "Type your message here",
      username: "",
      all_tweets: [],
      user_tweets: [],
      logged_user: "",
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
        logged_user: data.username,
        });

      })
      .then(() => {
        fetch(`/api/users/${this.props.user_data.id}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({
              user_tweets: data.tweets,
            });
          });
      })
      .then(() => {
        fetch("/api/tweets")
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({
              all_tweets: data.tweets,
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
            username: this.state.user,
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
        fetch("/api/tweets")
          .then(handleErrors)
          .then((data) => {
            console.log(data);
            this.setState({ all_tweets: data.tweets });
          });
      })
      .then(() => {
        fetch(`/api/users/${this.state.username}/tweets`)
          .then(handleErrors)
          .then((data) => {
            this.setState({ user_tweets: data.tweets });
          });
      });
  };

  deletePost(id, user) {
    if (user == this.state.logged_user) {
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
          fetch("/api/tweets")
            .then(handleErrors)
            .then((data) => {
              console.log(data);
              this.setState({ all_tweets: data.tweets });
            });
        })
        .then(() => {
          fetch(`/api/users/${this.state.username}/tweets`)
            .then(handleErrors)
            .then((data) => {
              this.setState({ user_tweets: data.tweets });
            });
        });
    }
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
              <Post
                username={this.state.username}
                all_tweets={this.state.all_tweets}
                text={this.state.text}
                logged_user={this.state.logged_user}
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
   const node = document.getElementById('params');
   const user_data = JSON.parse(node.getAttribute('data-user'));

  ReactDOM.render(
    <Feedpage /*auth_data={auth_data}*/ user_data={user_data} />,
    document.body.appendChild(document.createElement("div"))
  );
});
