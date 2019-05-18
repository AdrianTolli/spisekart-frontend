import React, { Component } from "react";
import LoginForm from "../../components/loginform";
import Info from "../../components/info";
import "./style.css";

class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Spisekart</h1>
        <p className="title">
          Få åpningstider og meny på nett, raskt og enkelt!
        </p>
        <div className="homepageImg">
          <div className="login">
            <LoginForm />
          </div>
        </div>
        <div className="infoContainer">
          <Info
            title="Din nettside!"
            text="Lag din egen nettside ved hjelp av spisekart.no! Raskt, enkelt og billig!"
          />
          <Info
            title="Ferdiglaget templates"
            text="Velg mellom 5 unike templates!"
          />
          <Info
            title="Billig og enkelt"
            text="For kunn 50,- i måneden, ha opp til 3 resturanter!"
          />
        </div>
      </div>
    );
  }
}

export default Home;
