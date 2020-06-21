import React, { useState, useEffect } from "react";

import axios from "axios";
import { makeGetNewCases, getCasesPer100kResidents } from "./components/cases";
import Result from "./Result";

import imgJa from "./sweden_ja.png";
import imgNej from "./sweden_nej.png";
import imgQuestionMark from "./questionmark.png";

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

  const img = data.error
    ? imgQuestionMark
    : data.covidCases < 50
    ? imgJa
    : imgNej;

  const recommendation = data.error
    ? "UNKNOWN"
    : data.covidCases < 50
    ? "YES"
    : "NO";

  const description = {
    line1: data.error ? data.error : data.covidCases + " new cases",
    line2: data.error ? "" : "per 100k inhabitants in the last 7 days",
  };

  return (
    <Result
      img={img}
      recommendation={recommendation}
      description={description}
    ></Result>
  );
}

export default App;
