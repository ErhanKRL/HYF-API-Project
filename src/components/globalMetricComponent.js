import { formatNumber } from "../utils/formatNumber";
import { formatText } from "../utils/formatText";

export const createGlobalMetricComponent = (title, globalMetrics) => {
  const {total_market_cap, stablecoin_market_cap, altcoin_market_cap, defi_market_cap} = globalMetrics.data.quote.USD;
  const marketData = {total_market_cap, stablecoin_market_cap, altcoin_market_cap, defi_market_cap}
  const {btc_dominance, btc_dominance_24h_percentage_change: btc_dominance_24h_change, eth_dominance, eth_dominance_24h_percentage_change: eth_dominance_24h_change} = globalMetrics.data;
  const dominanceData = {btc_dominance, btc_dominance_24h_change, eth_dominance, eth_dominance_24h_change};
  const {total_volume_24h, stablecoin_volume_24h, altcoin_volume_24h, defi_volume_24h} = globalMetrics.data.quote.USD;
  const volumeData = {total_volume_24h, stablecoin_volume_24h, defi_volume_24h, altcoin_volume_24h}
  let table;
  
  switch (title) {
    case 'Market Capital':
      table = createTable(title, marketData)
      break;
    case 'Dominance':
      table = createTable(title, dominanceData)
      break;
    case 'Volume':
      table = createTable(title, volumeData);
    default:
      break;
  }

  const element = document.createElement('div');
  element.className = 'global-metric';
  element.appendChild(table);
  return element;
};

const createTableHead = (table, name) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let th = document.createElement("th");
  let text = document.createTextNode(name);
  th.appendChild(text);
  row.appendChild(th);
}

const generateTable = (table, data, name) => {
  Object.keys(data).forEach(key =>{
    let text = formatText(key);
    let value = formatNumber(data[key], name);
    let row = table.insertRow();
    let titleCell = row.insertCell();
    let titleText = document.createTextNode(text);
    titleCell.appendChild(titleText);
    let valueCell = row.insertCell();
    let valueText = document.createTextNode(value);
    valueCell.appendChild(valueText);
  })
}
  

const createTable = (name, data) => {
  const table = document.createElement("table");
  generateTable(table, data, name);
  createTableHead(table, name);
  return table;
};
