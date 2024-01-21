import { getCurrencyList } from '../utils/getCurrencyList';
import { checkDataTimeStamp } from '../utils/checkDataTimeStamp';
import { createTableComponent } from './tableComponent';
import { createPaginationComponent } from './paginationComponent';
import { data } from '../data';

export const createCurrencyListComponent = async (start, onClick) => {
  let timeStamp;
  if (data.currencyListData === undefined) {
    const currencyData = await getCurrencyList(start);
    data.currencyListData = {
      [start]: currencyData,
    };
    localStorage.setItem('data', JSON.stringify(data));
  } else if (data.currencyListData[start] === undefined) {
    const currencyData = await getCurrencyList(start);
    data.currencyListData[start] = currencyData;
    localStorage.setItem('data', JSON.stringify(data));
  } else {
    timeStamp = data.currencyListData[start].status.timestamp;
    const isDataUpToDate = checkDataTimeStamp(timeStamp);
    if (!isDataUpToDate) {
      data.currencyListData[start] = getCurrencyList(start);
      localStorage.setItem('data', JSON.stringify(data));
    }
  }
  const currencyListingData = data.currencyListData[start].data.map((coin) => {
    return diluteListingData(coin);
  });
  const table = createTableComponent(currencyListingData);
  const containerElement = document.createElement('div');
  containerElement.className = 'list-container';
  const totalPages = data.currencyListData[start].status.total_count;
  const paginationComponent = createPaginationComponent(
    start,
    totalPages,
    onClick
  );
  containerElement.appendChild(paginationComponent);
  containerElement.appendChild(table);
  return containerElement;
};

function diluteListingData(data) {
  const {
    name: name,
    symbol: symbol,
    cmc_rank: cmcRank,
    quote: {
      USD: {
        price: price,
        market_cap: m_cap,
        percent_change_24h: change_24h,
        percent_change_7d: change_7d,
        volume_change_24h: v_change_24h,
        volume_24h: volume_24h,
        volume_7d: volume_7d,
      },
    },
  } = data;

  const extractedInfo = {
    cmcRank,
    name,
    symbol,
    price,
    change_24h,
    change_7d,
    m_cap,
    volume_24h,
    volume_7d,
    v_change_24h,
  };

  return extractedInfo;
}
