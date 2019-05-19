import React, { Component } from "react";
import AllergenSelect from "../allergenSelect";

class CreateDish extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      dishName: "",
      dishDescription: "",
      allergens: [],
      price: ""
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.addDish = this.addDish.bind(this);
    this.allergyChange = this.allergyChange.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }

  resetValues() {
    this.setState({
      dishName: "",
      dishDescription: "",
      allergens: [],
      price: ""
    });
  }

  addDish() {
    fetch(`https://spisekart.com/api/graphql`, {
      method: "POST",
      body: `mutation{createDish(name:"${this.state.dishName}", description:"${
        this.state.dishDescription
      }", restaurantId:"${this.props.restaurantId}", price: ${
        this.state.price
      }, allergens:${
        this.state.allergens.length ? this.state.allergens : "[]"
      }){id,description,name,price}}`,
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => response.json())
      .then(json => {
        this.props.updateRestaurants();
        this.resetValues();
      });
  }

  inputHandler(e) {
    const { name, value } = e.target;
    return this.setState({
      [name]: value
    });
  }

  allergyChange(newAllergens) {
    this.setState({
      allergens: newAllergens
    });
  }

  render() {
    return (
      <div className="dishes">
        <div className="dish">
          <div className="dishInfoContainer">
            <div>
              <input
                type="text"
                placeholder="Rett navn"
                name="dishName"
                value={this.state.dishName}
                onChange={this.inputHandler}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Beskriv retten"
                name="dishDescription"
                value={this.state.dishDescription}
                onChange={this.inputHandler}
              />
            </div>
          </div>
          <div className="priceContainer">
            <input
              type="text"
              placeholder="Pris"
              name="price"
              value={this.state.price}
              onChange={this.inputHandler}
            />
          </div>
        </div>
        <div>
          <div className="allergens">
            Allergener: {this.state.allergens}
            <AllergenSelect onChange={this.allergyChange} />
          </div>
          <div className="editButtons">
            <input type="submit" value="Legg til rett" onClick={this.addDish} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDish;
