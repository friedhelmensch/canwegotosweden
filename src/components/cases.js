export function makeGetNewCases(fetch) {
  return async (from, to) => {
    const request = `https://api.covid19api.com/country/sweden/status/confirmed?from=${from.toISOString()}&to=${to.toISOString()}`;
    const result = await fetch(request);

    var datapoints = result.data;
    var newCases =
      datapoints[datapoints.length - 1].Cases - datapoints[0].Cases;

    return newCases;
  };
}

export function getCasesPer100kResidents(cases, residents) {
  return cases / (residents / 100000);
}
