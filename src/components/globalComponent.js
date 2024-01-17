import { createGlobalMetricComponent } from "./globalMetricComponent";
import { getGlobalMetrics } from '../utils/getGlobalMetrics';
import { checkDataTimeStamp } from "../utils/checkDataTimeStamp";
import { data } from "../data";

const titles = ['Market Capital', 'Dominance', 'Volume']
const timeStamp = data.globalMetricsData.status.timestamp;

export const createGlobalComponent = async () => {
  const isDataUpToDate = checkDataTimeStamp(timeStamp)
  let globalMetrics;
  if(isDataUpToDate){
    globalMetrics = data.globalMetricsData;
    console.log(isDataUpToDate)
  } else {
    globalMetrics = await fetchGlobalMetricsData();
  }
  const element = document.createElement('div');
  element.className = 'global-container';
  titles.forEach(title => {
    const globalMetricElement = createGlobalMetricComponent(title, globalMetrics);
    element.appendChild(globalMetricElement);
  })
  return element;
};

async function fetchGlobalMetricsData() {
  try {
    data.globalMetricsData = await getGlobalMetrics();
    localStorage.setItem('data', JSON.stringify(data));
    return data.globalMetricsData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
