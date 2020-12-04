import React, { Component } from "react";
import "../styles.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      chosen_tweets: [],
    }
    this.userClicked = this.userClicked.bind(this);
  }

  userClicked = (e) => {
    this.setState({
      clicked: true,
    })
 
    fetch(`/api/users/${e.target.innerText}/tweets`)
          .then(handleErrors)
          .then((data) => {
            console.log(data)
            this.setState({
              chosen_tweets: data.tweets,
            });      
      }) 
  };

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

        { this.state.clicked === false ?

        all_tweets.map((tweet) => {
          return (
            <div className="border_tweets">
              <div className="container">
                <div className="row">
                  <div key={tweet.id} className="col-8">
                  <p className="p_stats" href="#"><span className="given_username" onClick={this.userClicked}>{tweet.username}</span>@ {tweet.username}</p>
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
        })
        :
        this.state.chosen_tweets.map((tweet) => {
          return (
            <div className="border_tweets">
              <div className="container">
                <div className="row">
                  <div key={tweet.id} className="col-8">
                  <p className="p_stats" href="#">{tweet.username}@ {tweet.username}</p>
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
        })
      }
      </React.Fragment>
    );
  }
}

export default Post;
