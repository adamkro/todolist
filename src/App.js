import React from "react";
import "./App.css";
import Navbar from "./components/nav/navbar";
import Card from "./components/nav/card";
import NewList from "./components/nav/newlist";
import Board from "./components/board";
import Spotify from "./components/nav/spotify";
import Calendar from "./components/nav/calendar";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="d-flex">
        <div className="col-2 bg-light p-0">
          <NewList />
          <Card />
          <Calendar />
          <Spotify />
        </div>
        <Board />
      </main>
    </React.Fragment>
  );
}

export default App;
