import { checkDataTimeStamp } from "../utils/checkDataTimeStamp";
import { createPaginationComponent } from "./paginationComponent";
import { createTableComponent } from "./tableComponent";
import { getCategories } from "../utils/getCategories";
import { data } from "../data";

export const createCategoriesComponent = async (start, onClick) => {
  let timeStamp;
  if(data.categoryListData === undefined) {
    const categoriesData = await getCategories(start);
    data.categoryListData = {
      [start]: categoriesData
    };
    localStorage.setItem('data', JSON.stringify(data));
  } else if (data.categoryListData[start] === undefined) {
    const categoriesData = await getCategories(start);
    data.categoryListData[start] = categoriesData
    localStorage.setItem('data', JSON.stringify(data));
  } else {
    timeStamp = data.categoryListData[start].status.timestamp
    const isDataUpToDate = checkDataTimeStamp(timeStamp);
    if(!isDataUpToDate){
    data.categoryListData[start] = getCategories(start);
    localStorage.setItem('data', JSON.stringify(data));
    } 
  }
  const categoryListingData = data.categoryListData[start].data.map((category, index) => {
    const num = start + index
    return diluteListingData(category, num)
  })
  const table = createTableComponent(categoryListingData)
  const containerElement = document.createElement('div');
  containerElement.className = 'list-container';
  const totalPages = 300;
  const paginationComponent = createPaginationComponent(start, totalPages, onClick)
  containerElement.appendChild(paginationComponent);
  containerElement.appendChild(table);
  return containerElement;
};

function diluteListingData(data, num) {
  const {
      name:name,
      num_tokens:tokens,
      avg_price_change:avg_p_change,
      market_cap: m_cap,
      market_cap_change: m_cap_change,
      volume: volume,
      volume_change: v_change,    
  } = data;

  const extractedInfo = {
      num:num,
      name,
      tokens,
      avg_p_change,
      m_cap,
      m_cap_change,
      volume,
      v_change,
  };

  return extractedInfo;
}