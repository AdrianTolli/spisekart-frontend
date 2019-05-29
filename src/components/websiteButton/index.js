import React, { Component } from "react";

class WebsiteButton extends Component {
  render() {
    return (
      <button className="sidebarButton">
        {this.props.restaurant.website.subdomain}.spisekart.com
      </button>
    );
  }
}

export default WebsiteButton;
