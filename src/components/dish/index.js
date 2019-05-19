import React, { Component } from "react";
import EditableProperty from "../editableProperty";
import "./style.css";

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editButton: "Edit",
      dish: {
        name: props.dish.name,
        description: props.dish.description,
        id: props.dish.id,
        price: props.dish.price,
        allergens: []
      },
      token: localStorage.getItem("token")
    };
    this.editHandler = this.editHandler.bind(this);
    this.onEditableChange = this.onEditableChange.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler() {
    fetch("https://spisekart.com/api/graphql", {
      method: "POST",
      body: `mutation{deleteDish(dishId:${this.state.dish.id}){status}}`,
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => response.json())
      .then(() => this.props.updateRestaurants());
  }

  editHandler() {
    if (!this.state.isEditing) {
      this.setState({
        isEditing: true,
        editButton: "Save"
      });
    } else {
      this.setState({
        isEditing: false,
        editButton: "Edit"
      });
      fetch("https://spisekart.com/api/graphql", {
        method: "POST",
        body: `mutation{editDish(dishId:${this.state.dish.id}, name:"${
          this.state.dish.name
        }", description:"${this.state.dish.description}", price:${
          this.state.dish.price
        }){name,description,price,allergens{id,name}, id}}`,
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
        .then(response => response.json())
        .then(() => this.props.updateRestaurants());
    }
  }

  onEditableChange(inputValue, field) {
    const newDish = Object.assign({}, this.state.dish);
    newDish[field] = inputValue;
    this.setState({
      dish: newDish
    });
  }

  render() {
    return (
      <div className="dishes">
        <div className="dish">
          <div className="dishInfoContainer">
            <div>
              <EditableProperty
                value={this.state.dish.name}
                name="name"
                isEditing={this.state.isEditing}
                onChange={this.onEditableChange}
                className="dishName"
              />
            </div>
            <div>
              <EditableProperty
                value={this.state.dish.description}
                name="description"
                isEditing={this.state.isEditing}
                onChange={this.onEditableChange}
                className=""
              />
            </div>
          </div>
          <div className="priceContainer">
            <EditableProperty
              value={this.state.dish.price}
              name="price"
              isEditing={this.state.isEditing}
              onChange={this.onEditableChange}
              className=""
            />
          </div>
        </div>
        <div>
          <div className="allergens">
            Allergener:{" "}
            {this.props.dish.allergens.map(allergen => allergen.name)}
          </div>
          <div className="editButtons">
            <button className="editButton" onClick={this.editHandler}>
              {this.state.editButton}
            </button>
            <button className="editButton" onClick={this.deleteHandler}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dish;
