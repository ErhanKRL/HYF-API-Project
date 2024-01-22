import { formatData } from '../utils/formatData';

export const createGlobalMetricTableComponent = (title, globalMetrics) => {
  const element = document.createElement('div');
  element.className = 'global-metric';
  const header = document.createElement('p');
  const text = formatData(title, 'Title')
  header.textContent = text;
  element.appendChild(header);
  const table = document.createElement('table');
  generateTable(table, globalMetrics, title);
  //createTableHead(table, title);
  element.appendChild(table);
  return element;
};

const createTableHead = (table, title) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let th = document.createElement('th');
  let text = formatData(title, 'Title');
  let titleText = document.createTextNode(text);
  th.appendChild(titleText);
  row.appendChild(th);
};

const generateTable = (table, data, title) => {
  Object.keys(data).forEach((key) => {
    let text = formatData(key, 'Title');
    let value = formatData(data[key], title);
    let row = table.insertRow();
    let titleCell = row.insertCell();
    let titleText = document.createTextNode(text);
    titleCell.appendChild(titleText);
    let valueCell = row.insertCell();
    let valueText = document.createTextNode(value);
    valueCell.appendChild(valueText);
  });
};
