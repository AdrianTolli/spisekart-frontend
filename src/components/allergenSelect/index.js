import React, { Component } from "react";

class AllergenSelect extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      allergenList: [],
      selectedAllergenList: []
    };
    this.fetchAllAllergens = this.fetchAllAllergens.bind(this);
    this.allergenChecked = this.allergenChecked.bind(this);
  }

  fetchAllAllergens() {
    fetch(`https://spisekart.com/api/graphql`, {
      method: "POST",
      body: `query{
            allergens{name,id}
          }`,
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          allergenList: json.data.allergens
        });
      });
  }

  allergenChecked(status, allergenId) {
    console.log(status, allergenId);
    if (status) {
      const newAllergenList = this.state.selectedAllergenList.slice(0);
      newAllergenList.push(allergenId);
      this.setState(
        {
          selectedAllergenList: newAllergenList
        },
        () => this.props.onChange(this.state.selectedAllergenList)
      );
    } else {
      const newAllergenList = this.state.selectedAllergenList.slice(0);
      const index = newAllergenList.indexOf(allergenId);
      newAllergenList.splice(index, 1);
      this.setState(
        {
          selectedAllergenList: newAllergenList
        },
        () => this.props.onChange(this.state.selectedAllergenList)
      );
    }
  }

  componentDidMount() {
    this.fetchAllAllergens();
  }

  render() {
    return (
      <div>
        {this.state.allergenList.map(allergen => (
          <div key={allergen.id}>
            <input
              type="checkbox"
              onChange={e =>
                this.allergenChecked(e.target.checked, allergen.id)
              }
            />
            {allergen.name}
          </div>
        ))}
      </div>
    );
  }
}

export default AllergenSelect;
