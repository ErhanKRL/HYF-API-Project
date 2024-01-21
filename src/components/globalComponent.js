import { getGlobalMetrics } from '../utils/getGlobalMetrics';
import { checkDataTimeStamp } from '../utils/checkDataTimeStamp';
import { createGlobalMetricTableComponent } from './globalMetricTableComponent';
import { data } from '../data';

let timeStamp;
if (data.globalMetricsData === undefined) {
  timeStamp = 0;
} else {
  timeStamp = data.globalMetricsData.status.timestamp;
}

export const createGlobalComponent = async () => {
  const isDataUpToDate = checkDataTimeStamp(timeStamp);
  let globalMetrics;
  if (isDataUpToDate) {
    globalMetrics = data.globalMetricsData;
  } else {
    globalMetrics = await fetchGlobalMetricsData();
  }
  const globalMetricsData = diluteListingData(globalMetrics.data);
  const element = document.createElement('div');
  element.className = 'global-container';
  Object.keys(globalMetricsData).forEach((key) => {
    const globalMetricElement = createGlobalMetricTableComponent(
      key,
      globalMetricsData[key]
    );
    element.appendChild(globalMetricElement);
  });
  return element;
};

async function fetchGlobalMetricsData() {
  try {
    data.globalMetricsData = await getGlobalMetrics();
    localStorage.setItem('data', JSON.stringify(data));
    return data.globalMetricsData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function diluteListingData(data) {
  const {
    btc_dominance,
    btc_dominance_24h_percentage_change: btc_dominance_24h_change,
    eth_dominance,
    eth_dominance_24h_percentage_change: eth_dominance_24h_change,
    quote: {
      USD: {
        total_market_cap,
        stablecoin_market_cap,
        altcoin_market_cap,
        defi_market_cap,
        total_volume_24h,
        stablecoin_volume_24h,
        altcoin_volume_24h,
        defi_volume_24h,
      },
    },
  } = data;

  const extractedInfo = {
    market_capital: {
      total_market_cap,
      stablecoin_market_cap,
      altcoin_market_cap,
      defi_market_cap,
    },
    dominance: {
      btc_dominance,
      btc_dominance_24h_change,
      eth_dominance,
      eth_dominance_24h_change,
    },
    volume: {
      total_volume_24h,
      stablecoin_volume_24h,
      defi_volume_24h,
      altcoin_volume_24h,
    },
  };

  return extractedInfo;
}
