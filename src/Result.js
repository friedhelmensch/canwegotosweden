import React from "react";
import "./App.css";

function Result(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Is it safe to go to Sweden?</p>
        <img src={props.img} alt="logo" />
        <p>{props.recommendation} </p>
        <p>
          {props.description.line1} <br></br> {props.description.line2}
        </p>
      </header>
    </div>
  );
}

export default Result;
