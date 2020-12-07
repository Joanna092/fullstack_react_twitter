import React, { Component } from "react";
import "../styles.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Myposts extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleChange = () => {
    this.props.handleChange();
  };

  onFocus = () => {
    this.props.onFocus();
  };

  newPost = () => {
    this.props.newPost();
  };

  deletePost = () => {
    this.props.deletePost();
  };

  render() {
    const { user_tweets } = this.props;
    return (
      <React.Fragment>
        <div className="border_write_tweet">
          <form onSubmit={this.props.newPost}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="What is happening?"
                onChange={this.props.handleChange}
                value={this.props.text}
                onFocus={this.props.onFocus}
                name="text"
              ></textarea>

              <span>Upload Image</span>
              <button type="submit" className="btn btn-secondary tweet_button">
                Tweet
              </button>
            </div>
          </form>
        </div>

        {user_tweets.map((tweet) => {
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
                      onClick={() => this.props.deletePost(tweet.id)}
                      type="button"
                      className="btn btn-danger delete_button"
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

export default Myposts;
