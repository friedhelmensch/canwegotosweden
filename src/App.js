import React, { useState, useEffect } from "react";
import imgJa from "./sweden_ja.png";
import imgNej from "./sweden_nej.png";
import "./App.css";
import axios from "axios";

function App() {
  const from = new Date(new Date().setDate(new Date().getDate() - 8));
  const to = new Date(new Date().setDate(new Date().getDate() - 1));

  const [data, setData] = useState({ covidCases: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const request = `https://api.covid19api.com/country/sweden/status/confirmed?from=${from.toISOString()}&to=${to.toISOString()}`;
      const result = await axios(request);
      console.log(result.data);
      var datapoints = result.data;

      var newCases =
        datapoints[datapoints.length - 1].Cases - datapoints[0].Cases;

      const residents = 10000000;
      const casesPer100k = newCases / (residents / 100000);

      setData({ covidCases: casesPer100k });
    };

    fetchData();
  }, []);

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
