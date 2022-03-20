let weatherTableString = {
  1: "Klar himmel",
  2: "Nästan klar himmel",
  3: "Variabel molnighet",
  4: "Halvklar himmel",
  5: "Molnig himmel",
  6: "Mulen",
  7: "dimma",
  8: "Light rain showers",
  9: "Måttliga regnskurar",
  10: "Kr baftiga regnskurar",
  11: "Åskväder",
  12: "ätt snöslaskskurar",
  13: "Måttliga snöslaskskurar",
  14: "Kraftiga snöslaskskurar",
  15: "Lätta snöskurar",
  16: "Måttliga snöskurar",
  17: "Kraftiga snöskurar",
  18: "Duggregn",
  19: "Måttligt regn",
  20: "Mycket regn",
  21: "åska",
  22: "Lätt snöslask",
  23: "Måttlig snöslask",
  24: "Kraftig snöslask",
  25: "Lätt snöfall",
  26: "Måttligt snöfall",
  27: "Måttligt snöfall",
};

export function getWeatherDescription(statusNumber) {
  return weatherTableString[statusNumber];
}

export default function display(dataPoints) {
  const target = getTargetElement();
  buildWidget(dataPoints, target);
}

function getTargetElement() {
  return document.getElementById("tableWeather");
}

function buildWidget(dataPoints, target) {
  const table = createTable(dataPoints);
  const weatherHeader = document.createElement("h2");
  target.appendChild(weatherHeader);
  target.appendChild(table);
}

function createTable(data) {
  const table = document.createElement("table");
  const tableHeaders = createTableHeaders();
  const todayHeader = document.createElement("h3");
  todayHeader.innerText = "Idag";
  const tomorrowHeader = document.createElement("h3");
  tomorrowHeader.innerText = "Imorgon";
  const todayDataPoints = data.filter((data) => isToday(data));
  const todayRows = todayDataPoints.map((data) => createRow(data));
  const tomorrowDataPoints = data.filter((data) => isTomorrow(data));
  const tomorrowRows = tomorrowDataPoints.map((data) => createRow(data));

  table.appendChild(todayHeader);
  table.appendChild(tableHeaders);
  todayRows.forEach((row) => table.appendChild(row));
  table.appendChild(tomorrowHeader);
  table.appendChild(tableHeaders.cloneNode(true));
  tomorrowRows.forEach((row) => table.appendChild(row));
  return table;
}

function isToday(data) {
  let now = new Date();
  return new Date(data.validTime).getDate() == now.getDate();
}

function isTomorrow(data) {
  let now = new Date();
  return new Date(data.validTime).getDate() == now.getDate() + 1;
}
//crateing header for weather table
function createTableHeaders() {
  const headerRow = document.createElement("tr");
  const time = document.createElement("th");
  time.innerText = "KL";
  headerRow.appendChild(time);
  const temperature = document.createElement("th");
  temperature.innerText = "Temperature";
  headerRow.appendChild(temperature);
  const wind = document.createElement("th");
  headerRow.appendChild(wind);
  const windDirection = document.createElement("th");
  windDirection.innerText = "Vind Inriktning";
  headerRow.appendChild(windDirection);
  wind.innerText = "Vind Styrka";
  headerRow.appendChild(wind);
  const sky = document.createElement("th");
  sky.innerText = "Himmel";
  headerRow.appendChild(sky);
  return headerRow;
}

function createRow(data) {
  const row = document.createElement("tr");
  const time = document.createElement("td");
  time.innerText = new Date(data.validTime).getHours();
  row.appendChild(time);
  const temperature = document.createElement("td");
  temperature.innerText = data.parameters[0].values[0].toString();
  row.appendChild(temperature);
  var teamsTd = document.createElement("Td");
  const wind = document.createElement("td");
  const windArrow = document.createElement("p");
  windArrow.innerText = "🠕";
  windArrow.style.transform = "rotate(" + data.parameters[1].values[0] + "deg)"; //indicate wind direction by rotating the arrow symbol
  wind.innerText = " (" + data.parameters[2].values[0].toString() + ") ";
  teamsTd.appendChild(windArrow);
  row.appendChild(teamsTd);
  row.appendChild(wind);
  const sky = document.createElement("td");
  sky.innerText = getWeatherDescription(data.parameters[3].values[0]);
  row.appendChild(sky);

  return row;
}
