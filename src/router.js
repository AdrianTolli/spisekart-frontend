import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./screens/home";
import Admin from "./screens/admin";

class router extends Component {
  render() {
    return (
      <div className="height100">
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
      </div>
    );
  }
}

export default router;
