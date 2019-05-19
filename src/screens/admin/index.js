import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreateRestaurant from "../../components/createRestaurant";
import Restaurant from "../../components/restaurant";
import Sidebar from "../../components/sidebar";
import "./style.css";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      restaurants: [],
      selectedRestaurantIndex: null
    };

    this.fetchAllRestaurants = this.fetchAllRestaurants.bind(this);
    this.updateRestaurants = this.updateRestaurants.bind(this);
    this.onRestaurantClick = this.onRestaurantClick.bind(this);
  }

  fetchAllRestaurants() {
    fetch(`https://spisekart.com/api/graphql`, {
      method: "POST",
      body: `query{restaurants{website{id}, id, dishes{allergens{description,id,name}description,id,name,price}, name}}`,
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          restaurants: json.data.restaurants,
          selectedRestaurant: 0 /*TODO: Må fjernes*/
        });
      });
  }

  componentDidMount() {
    this.fetchAllRestaurants();
  }

  updateRestaurants() {
    this.fetchAllRestaurants();
  }

  onRestaurantClick(e) {
    this.setState({
      selectedRestaurant: e
    });
    console.log(e);
  }

  render() {
    if (!this.state.token) {
      return <Redirect to="/" />;
    }
    if (this.state.restaurants.length === 0) {
      return (
        <div className="noResturantBody height100">
          <CreateRestaurant
            titleText="Legg til din første resturant:"
            className="noResturantContainer"
            updateRestaurants={this.updateRestaurants}
          />
        </div>
      );
    }
    return (
      <div className="adminBody height100">
        <div className="flexView height100">
          <div className="sidebar">
            <Sidebar
              restaurants={this.state.restaurants}
              onRestaurantClick={this.onRestaurantClick}
            />

            <div>
              <CreateRestaurant
                titleText="Legg til en ny resturant:"
                className="createResturantContainer"
                updateRestaurants={this.updateRestaurants}
              />
            </div>
          </div>
          <div className="mainContent">
            <Restaurant
              restaurant={this.state.restaurants[this.state.selectedRestaurant]}
              updateRestaurants={this.updateRestaurants}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
