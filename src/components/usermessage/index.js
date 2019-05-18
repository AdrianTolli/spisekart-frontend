import React, { Component } from "react";
import "./style.css";

class UserMessage extends Component {
  render() {
    if (this.props.userMessage) {
      return (
        <div className={this.props.error ? "error" : "success"}>
          {this.props.userMessage}
        </div>
      );
    }
    return null;
  }
}

export default UserMessage;
