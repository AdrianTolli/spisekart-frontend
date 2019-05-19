import React, { Component } from "react";
import "./style.css";

class CreateRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      restaurantName: "",
      token: localStorage.getItem("token")
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
  }

  addRestaurant() {
    fetch(`https://spisekart.com/api/graphql`, {
      method: "POST",
      body: `mutation{createRestaurant(name:"${
        this.state.restaurantName
      }"){id,name}}`,
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => response.json())
      .then(() => {
        this.props.updateRestaurants();
      });
  }

  inputHandler(e) {
    const { name, value } = e.target;
    return this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          className="createRestaurantInput"
          type="text"
          placeholder="Legg til ny"
          name="restaurantName"
          value={this.state.restaurantName}
          onChange={this.inputHandler}
        />
        <br />

        <input
          className={
            "createRestaurantButton " +
            (this.state.restaurantName != "" ? "active" : "")
          }
          type="submit"
          value="Legg til"
          onClick={this.addRestaurant}
        />
      </div>
    );
  }
}

export default CreateRestaurant;
