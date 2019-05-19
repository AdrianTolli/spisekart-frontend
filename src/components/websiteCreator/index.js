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
        <div>
          For å opprette din spisekart-nettside, må du velge et domene navn i
          feltet under, og trykke generer.
        </div>
        <div>
          Ditt domene-navn blir{" "}
          {this.state.subdomain ? this.state.subdomain : "[Det du velger]"}
          .spisekart.com
        </div>
        <input
          type="text"
          onChange={this.editSubdomain}
          value={this.state.subdomain}
          placeholder="Ditt domene navn"
        />
        <button className="sidebarButton" onClick={this.createWebsite}>
          Generer
        </button>
      </div>
    );
  }
}

export default WebsiteCreator;
