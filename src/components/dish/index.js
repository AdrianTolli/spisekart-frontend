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
        price: props.dish.price
      }
    };
    this.editHandler = this.editHandler.bind(this);
    this.onEditableChange = this.onEditableChange.bind(this);
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
      <div className="dishItem">
        <EditableProperty
          value={this.state.dish.name}
          name="name"
          isEditing={this.state.isEditing}
          onChange={this.onEditableChange}
          className="flex3 dishName"
        />
        <EditableProperty
          value={this.state.dish.description}
          name="description"
          isEditing={this.state.isEditing}
          onChange={this.onEditableChange}
          className="flex3"
        />
        <EditableProperty
          value={this.state.dish.price}
          name="price"
          isEditing={this.state.isEditing}
          onChange={this.onEditableChange}
          className="flex2"
        />
        <p className="flex3">
          Allergener: {this.props.dish.allergens.map(allergen => allergen.name)}
        </p>
        <button className="flex1" onClick={this.editHandler}>
          {this.state.editButton}
        </button>
        <button className="flex1">X</button>
      </div>
    );
  }
}

export default Dish;
