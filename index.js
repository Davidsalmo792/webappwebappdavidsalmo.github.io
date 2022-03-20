import display from "./TableCreater.js";

export async function fetchWeather() {
  return await fetch(
    `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json`
  )
    .then((response) => response.json())
    .then((data) => getValidData(data))
    .then((filteredData) => filterParameters(filteredData));
}

async function initialize(e) {
  let dataPoints = await fetchWeather();
  display(dataPoints);
}

function getValidData(data) {
  return data.timeSeries.filter((dataPoint) => {
    return (
      (new Date(dataPoint.validTime).getHours() == 6 ||
        new Date(dataPoint.validTime).getHours() == 12 ||
        new Date(dataPoint.validTime).getHours() == 18) &&
      differenceDays(new Date(dataPoint.validTime)) < 2
    );
  });
}

function differenceDays(date) {
  const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds
  return (new Date().getTime() - date.getTime()) * oneDay;
}

function filterParameters(filteredData) {
  //let list = filterValidNames(filteredData);

  return filteredData.map((data) => {
    data.parameters = data.parameters.filter(
      (p) =>
        p.name == "t" || // Air temperature
        p.name == "wd" || //  wind direction
        p.name == "ws" || // Wind speed
        p.name == "Wsymb2" // a valid parameters from api
    );
    return data;
  });
}

initialize();
