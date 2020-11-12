import React, { Component } from "react";
import "../styles.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import Stats from "./stats";

class Post extends Component {
  constructor(props) {
    super(props);
   /* this.state = {
      text: "Type your message here",
      tweets: [],
      username: " ",
      logged_user: "example user",
    }; */
   // this.handleChange = this.handleChange.bind(this);
    /*  this.deletePost = this.deletePost.bind(this) */
  }

  /*handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }*/

  handleChange = () => {
    this.props.handleChange()
}

  onFocus = () => {
  this.props.onFocus()
}

  newPost = () => {
    this.props.newPost()
}

  deletePost = () => {
    this.props.deletePost()
}

/*

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
            this.setState({ tweets: data.tweets });
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
              this.setState({ tweets: data.tweets });
            });
        });
    }
  }

  */

  /*
  componentDidMount() {
    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          logged_user: data.username,
        });
      });

    fetch("/api/tweets")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({ tweets: data.tweets });
      });
  }
*/

  render() {
   const { all_tweets } = this.props;
   
    return (
      <React.Fragment>
        <div className="border_write_tweet">
          <form onSubmit={this.props.newPost}>
            <div class="form-group">
              <textarea
                class="form-control"
                rows="3"
                placeholder="What is happening?"
                onChange={this.props.handleChange}
                value={this.props.text}
                onFocus={this.props.onFocus}
                name="text"
              ></textarea>

              <span>Upload Image</span>
              <button type="submit" class="btn btn-secondary tweet_button">
                Tweet
              </button>
            </div>
          </form>
        </div>

        {all_tweets.map((tweet) => {
          return (
            <div className="border_tweets">
              <div className="container">
                <div className="row">
                  <div key={tweet.id} className="col-8">
                    <p className="p_stats">Username@ {tweet.username}</p>
                    <p>{tweet.message}</p>
                  </div>

                  <div className="col-4">
                    <button
                      onClick={() => {this.props.deletePost(tweet.id, tweet.username)}}
                      type="button"
                      class="btn btn-danger delete_button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Post;
