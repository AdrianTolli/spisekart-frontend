import React, { Component } from "react";
import UserMessage from "../usermessage";
import { Link } from "react-router-dom";
import "./style.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      userMessage: "",
      error: false,
      isLoggedIn: false
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  registerUser() {
    fetch("https://spisekart.com/api/graphql", {
      method: "POST",
      body: `mutation{createUser(email: "${
        this.state.username
      }", passwordCleartext:"${this.state.password}"){email, id, password}}`
    })
      .then(response => response.json())
      .then(json => {
        if (!json.errors) {
          this.setState({
            userMessage: "Suksess, du er nå registrert",
            error: false
          });
        } else {
          this.setState({
            userMessage: "Error, prøv igjen",
            error: true
          });
        }
      });
  }

  loginUser() {
    fetch("https://spisekart.com/api/graphql", {
      method: "POST",
      body: `query{login(email:"${this.state.username}", password:"${
        this.state.password
      }"){token}}`
    })
      .then(response => response.json())
      .then(json => {
        if (!json.errors) {
          localStorage.setItem("token", json.data.login.token);
          this.setState({
            isLoggedIn: true,
            userMessage: "",
            error: false
          });
        } else {
          this.setState({
            isLoggedIn: false,
            userMessage: "Feil brukernavn eller passord",
            error: true
          });
        }
      });
  }

  inputHandler(e) {
    const { name, value } = e.target;
    return this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          You are allready logged in
          <Link to="/admin">Admin</Link>
        </div>
      );
    }
    return (
      <div>
        <UserMessage
          userMessage={this.state.userMessage}
          error={this.state.error}
        />
        <h2>Login or register</h2>
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.value}
          onChange={this.inputHandler}
        />{" "}
        <br />
        <input
          className="input"
          type="text"
          placeholder="Password"
          name="password"
          value={this.state.value}
          onChange={this.inputHandler}
        />{" "}
        <br />
        <input
          className="button"
          type="submit"
          value="Login"
          onClick={this.loginUser}
        />
        <input
          className="button"
          type="submit"
          value="Register"
          onClick={this.registerUser}
        />
      </div>
    );
  }
}

export default LoginForm;
