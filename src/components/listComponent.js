import { getCurrencyList } from "../utils/getCurrencyList";
import { checkDataTimeStamp } from "../utils/checkDataTimeStamp";
import { data } from "../data";

let timeStamp;
if(data.currencyListData === undefined) {
  timeStamp = 0;
 } else {
  timeStamp = data.currencyListData.status.timestamp
} 

export const createCurrencyListComponent = async (start = 1) => {
  const isDataUpToDate = checkDataTimeStamp(timeStamp);

  let currencyList;
  if(isDataUpToDate){
    currencyList = data.currencyListData;
  } else {
    currencyList = await fetchCurrencyListData(start);
  }
  console.log(currencyList)
  const element = document.createElement('div');
  element.className = 'coin-list-container';
  element.innerHTML = String.raw`
  <h2>This Is List Component</h2>
  `;
  return element;
};

async function fetchCurrencyListData(start) {
  try {
    data.currencyListData = await getCurrencyList(start);
    localStorage.setItem('data', JSON.stringify(data));
    return data.currencyListData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
