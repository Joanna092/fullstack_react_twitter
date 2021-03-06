import React, { Component } from "react";
import "../styles.scss";

class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="border_stats">
          <p>
            <span className="p_stats">Your username: </span>
            {this.props.username}
          </p>
          <p>
            <span className="p_stats">Your tweet number:</span>{" "}
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
