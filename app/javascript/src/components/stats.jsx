import React, { Component } from "react";
import "../styles.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import Post from "./posts";

class Stats extends Component {
  _isMounted = false;

  /*
  constructor() {
    super();
    this.state = {
      username: " ",
      tweets: [],
    };
  }
  */

 constructor(props) {
  super(props);
}
/*
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      fetch("/api/authenticated")
        .then(handleErrors)
        .then((data) => {
          console.log(data);
          this.setState({
            username: data.username,
          });
        })
        .then(() => {
          fetch(`/api/users/${this.props.username}/tweets`)
            .then(handleErrors)
            .then((data) => {
              this.setState({
                tweets: data.tweets,
              });
            });
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
*/
  render() {
    return (
      <React.Fragment>

        <div className="border_stats">
          <p>
            <span className="p_stats">Username: </span>
            {this.props.username}
          </p>
          <p>
            <span className="p_stats">Tweet number:</span>{" "}
             {this.props.user_tweets}
          </p>
          <p>
            <span className="p_stats">Trends:</span>
          </p>
          <span className="list_stats">
            <li>#Example trend</li>
            <li>#Another example trend</li>
            <li>#Lorem Ipsum</li>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Stats;
