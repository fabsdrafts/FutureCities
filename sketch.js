console.log('Loading data...');

let table;

const canvasWidth = window.innerWidth;
const canvasHeight = 1000; // ⚠️ size limit if too long
const xPosAxis1 = 40; // px
const xPosAxis2 = 0; // px
const yPosAxis1 = 300;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    position = convertDegreesToPosition(meanTemp);
    drawTempToday(position);
    drawLabelToday(position, city, meanTemp);

    futurePosition = convertDegreesToPosition(futureMeanTemp);
    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp);

    
  }

  // drawAxes();
  // drawAxesLabels();
}

function convertDegreesToPosition(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const position = map(temp, 15, 6, 800, 10);
  return position;
}

// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions
function drawTempToday(pos) {
  fill('magenta');
  circle(xPosAxis1, pos, 30);
}

function drawTempFuture(pos) {
  fill('blue');
  circle(yPosAxis1, pos, 30);
}

function drawLabelToday(pos, city, temp) {
  fill('green');
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis1 + 20, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, yPosAxis1 + 20, pos + 5);
}
