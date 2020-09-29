import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import ToDoList from "./components/todolist";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <ToDoList />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
