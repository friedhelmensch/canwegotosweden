import React, { useState, useEffect } from "react";
import imgJa from "./sweden_ja.png";
import imgNej from "./sweden_nej.png";
import "./App.css";
import axios from "axios";
import { makeGetNewCases, getCasesPer100kResidents } from "./components/cases";

const getCases = makeGetNewCases(axios);
const residents = 10000000;

function App() {
  const from = new Date(new Date().setDate(new Date().getDate() - 8));
  const to = new Date(new Date().setDate(new Date().getDate() - 1));

  const [data, setData] = useState({ covidCases: 0 });

  useEffect(() => {
    const fetchData = async () => {
      var newCases = await getCases(from, to);
      const casesPer100k = getCasesPer100kResidents(newCases, residents);
      setData({ covidCases: casesPer100k });
    };

    fetchData();
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Is it safe to go to Sweden?</p>
        <img src={data.covidCases < 50 ? imgJa : imgNej} alt="logo" />
        <p>{data.covidCases < 50 ? "YES" : "NO"}</p>
        <p>
          {data.covidCases} new cases <br></br> per 100k inhabitants in the last
          7 days
        </p>
      </header>
    </div>
  );
}

export default App;
