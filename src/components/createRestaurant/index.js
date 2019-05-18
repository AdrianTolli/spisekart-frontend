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
      <div className="createResturantContainer">
        <h4>Legg til en ny resturant:</h4>
        <input
          className="createRestaurantInput"
          type="text"
          placeholder="Resturant navn"
          name="restaurantName"
          value={this.state.restaurantName}
          onChange={this.inputHandler}
        />
        <br />
        <input
          className="createRestaurantButton"
          type="submit"
          value="Legg til resturant"
          onClick={this.addRestaurant}
        />
      </div>
    );
  }
}

export default CreateRestaurant;
