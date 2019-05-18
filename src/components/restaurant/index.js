import React, { Component } from "react";
import CreateDish from "../createDish";
import Dish from "../dish";
import WebsiteCreator from "../websiteCreator";
import "./style.css";

class Restaurant extends Component {
  render() {
    console.log(this.props.restaurant);
    if (!this.props.restaurant) {
      return <h1>Select a restaurant to the left</h1>;
    }
    return (
      <div className="restaurantContainer">
        <div>
          <h1>{this.props.restaurant.name}</h1>
          <h3>Spisekart:</h3>
          {this.props.restaurant.dishes.map(dish => (
            <Dish dish={dish} key={dish.id} />
          ))}
        </div>
        <CreateDish
          restaurantId={this.props.restaurant.id}
          updateRestaurants={this.props.updateRestaurants}
        />
        {this.props.restaurant.website != null ? null : (
          <WebsiteCreator restaurantId={this.props.restaurant.id} />
        )}
      </div>
    );
  }
}

export default Restaurant;
