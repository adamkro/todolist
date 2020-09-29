import React, { Component } from "react";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      quote: "",
    };
  }
  componentDidMount() {
    fetch("  https://api.kanye.rest/")
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            quote: data.quote,
          });
        },
        (error) => {
          console.log("api error");
        }
      );
  }
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{this.state.quote}</span>
      </nav>
    );
  }
}
