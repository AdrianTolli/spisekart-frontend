import React, { Component } from "react";

class EditableProperty extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value, this.props.name);
  }

  render() {
    if (this.props.isEditing) {
      return (
        <div className={this.props.className}>
          <input
            type="text"
            value={this.props.value}
            onChange={this.onChange}
          />
        </div>
      );
    }
    return (
      <div className={this.props.className}>
        <p>{this.props.value}</p>
      </div>
    );
  }
}

export default EditableProperty;
