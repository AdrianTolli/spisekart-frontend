import React, { Component } from "react";
import "./style.css";

class Info extends Component {
  render() {
    return (
      <div className="infoBox">
        <h1 className="infoBoxTitle">{this.props.title}</h1>
        <p className="infoBoxText">{this.props.text}</p>
      </div>
    );
  }
}

export default Info;
