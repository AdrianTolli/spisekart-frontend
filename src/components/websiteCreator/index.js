import React, { Component } from "react";

class WebsiteCreator extends Component {
  constructor() {
    super();
    this.state = {
      subdomain: "",
      theme: "default"
    };
    this.editSubdomain = this.editSubdomain.bind(this);
    this.createWebsite = this.createWebsite.bind(this);
  }

  createWebsite() {
    fetch("https://spisekart.com/api/graphql", {
      method: "POST",
      body: `mutation{createWebsite(restaurantId:${
        this.props.restaurantId
      }, subdomain:${this.state.subdomain}, theme:"default"){id}}`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  editSubdomain(e) {
    this.setState({
      subdomain: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.editSubdomain}
          value={this.state.subdomain}
          placeholder="Ditt domene navn"
        />
        <button onClick={this.createWebsite}>Generer</button>
      </div>
    );
  }
}

export default WebsiteCreator;
