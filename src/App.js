import React, { useState, useEffect } from "react";
import imgJa from "./sweden_ja.png";
import imgNej from "./sweden_nej.png";
import imgQuestionMark from "./questionmark.png";
import "./App.css";
import axios from "axios";
import { makeGetNewCases, getCasesPer100kResidents } from "./components/cases";

const getCases = makeGetNewCases(axios);
const residents = 10000000;

function App() {
  const [data, setData] = useState({ covidCases: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const from = new Date(new Date().setDate(new Date().getDate() - 8));
      const to = new Date(new Date().setDate(new Date().getDate() - 1));

      const result = await getCases(from, to);

      if (result.error) {
        setData({ error: result.error });
      } else {
        const casesPer100k = getCasesPer100kResidents(result, residents);
        setData({ covidCases: casesPer100k });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Is it safe to go to Sweden?</p>
        <img
          src={
            data.error ? imgQuestionMark : data.covidCases < 50 ? imgJa : imgNej
          }
          alt="logo"
        />
        <p>{data.error ? "UNKNOWN" : data.covidCases < 50 ? "YES" : "NO"}</p>
        {data.error ? (
          <p>{data.error}</p>
        ) : (
          <p>
            {data.covidCases} new cases <br></br> per 100k inhabitants in the
            last 7 days
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
