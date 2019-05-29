import React, { Component } from "react";
import CreateDish from "../createDish";
import Dish from "../dish";
import WebsiteCreator from "../websiteCreator";
import "./style.css";

class Restaurant extends Component {
  constructor() {
    super();
    this.state = {
      addingNew: false
    };
    this.addNewDish = this.addNewDish.bind(this);
  }

  addNewDish() {
    this.setState({
      addingNew: true
    });
  }

  render() {
    if (!this.props.restaurant) {
      return <h1>Select a restaurant to the left</h1>;
    }
    return (
      <div className="restaurantContainer">
        <div>
          <div>
            <h1 className="restuarantTitle">{this.props.restaurant.name}</h1>
            {this.props.restaurant.dishes
              .sort(
                ({ id: previousID }, { id: currentID }) =>
                  previousID - currentID
              )
              .map(dish => (
                <Dish
                  updateRestaurants={this.props.updateRestaurants}
                  dish={dish}
                  key={dish.id}
                />
              ))}
          </div>
          {this.state.addingNew ? (
            <CreateDish
              restaurantId={this.props.restaurant.id}
              updateRestaurants={this.props.updateRestaurants}
            />
          ) : (
            <button className="sidebarButton" onClick={this.addNewDish}>
              Legg til ny rett
            </button>
          )}
        </div>

        <div>
          <WebsiteCreator
            restaurant={this.props.restaurant}
            updateRestaurants={this.props.updateRestaurants}
          />
        </div>
      </div>
    );
  }
}

export default Restaurant;
