import React, { Component } from "react";
import "./style.css";

class Sidebar extends Component {
  render() {
    return (
      <div>
        {this.props.restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className="restaurantButton"
            onClick={() => this.props.onRestaurantClick(index)}
          >
            <p>{restaurant.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Sidebar;
