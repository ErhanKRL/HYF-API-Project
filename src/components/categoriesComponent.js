import { checkDataTimeStamp } from "../utils/checkDataTimeStamp";
import { createPaginationComponent } from "./paginationComponent";
import { createTableComponent } from "./tableComponent";
import { getCategories } from "../utils/getCategories";
import { data } from "../data";

export const createCategoriesComponent = async (start, onClick) => {
  let categoryList;
  let timeStamp;
  if(data.categoryListData === undefined) {
    categoryList = await fetchCategoryListData(start);
  } else if (data.categoryListData[start] === undefined) {
    categoryList = await fetchCategoryListData(start);
  } else {
    timeStamp = data.categoryListData[start].status.timestamp
    const isDataUpToDate = checkDataTimeStamp(timeStamp);
    if(isDataUpToDate){
    categoryList = data.categoryListData;
    } 
  }
  console.log(categoryList);
  const categoryListingData = categoryList[start].data.map(category => {
    return diluteListingData(category)
  })
  const table = createTableComponent(categoryListingData)
  const containerElement = document.createElement('div');
  containerElement.className = 'category-list-container';
  const totalPages = 300;
  const paginationComponent = createPaginationComponent(totalPages, onClick)
  containerElement.appendChild(paginationComponent);
  containerElement.appendChild(table);
  return containerElement;
};

async function fetchCategoryListData(start) {
  try {
    data.categoryListData[start] = await getCategories(start);
    localStorage.setItem('data', JSON.stringify(data));
    return data.categoryListData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function diluteListingData(data) {
  const {
      name:name,
      num_tokens:num_tokens,
      avg_price_change:avg_p_change,
      market_cap: market_cap,
      market_cap_change: m_cap_change,
      volume: vol,
      volume_change: v_change,    
  } = data;
  console.log(vol, market_cap)
  const extractedInfo = {
      market_cap
  };

  return extractedInfo;
}