import { getCurrencyList } from "../utils/getCurrencyList";
import { checkDataTimeStamp } from "../utils/checkDataTimeStamp";
import { formatData } from "../utils/formatData";
import { data } from "../data";



export const createCurrencyListComponent = async (start, onClick) => {
  console.log(data.currencyListData)
  let currencyList;
  let timeStamp;
  if(data.currencyListData === undefined) {
    timeStamp = 0;
  } else if (data.currencyListData[start] === undefined) {
    currencyList = await fetchCurrencyListData(start);
  } else {
    timeStamp = data.currencyListData[start].status.timestamp
    const isDataUpToDate = checkDataTimeStamp(timeStamp);
    console.log(isDataUpToDate);
    if(isDataUpToDate){
    currencyList = data.currencyListData;
    } else {
    currencyList = await fetchCurrencyListData(start);
    }
  }
  
  //currencyList = await fetchCurrencyListData(start);
  const currencyListingData = currencyList[start].data.map(coin => {
    return diluteListingData(coin)
  })
  console.log(currencyListingData)
  const table = createTable(currencyListingData)
  const containerElement = document.createElement('div');
  containerElement.className = 'coin-list-container';
  const totalPages = currencyList[start].status.total_count;
  const paginationComponent = createPaginationComponent(totalPages, onClick)
  //const button = document.createElement('button');
  //button.textContent = 'button'
  //button.addEventListener('click', onClick);
  //containerElement.appendChild(button);
  containerElement.appendChild(paginationComponent);
  containerElement.appendChild(table);
  return containerElement;
};

const itemsPerPage = 100;
let startPage = 1;
let currentPage = startPage;


const createPaginationComponent = (totalCount, onClick) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
    startPage = currentPage - 2;
  if (startPage < 1){
    startPage = 1;
  }else if(startPage > totalPages - 4){
    startPage = totalPages - 4;
  }
  const ul = document.createElement('ul');
  ul.className = 'paginationList';
  const prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => {
      currentPage -= 1;
      handlePageClick(currentPage, onClick)
    })
    prevButton.disabled = currentPage === 1;
    ul.appendChild(prevButton);
  for(let i = startPage; i <= startPage + 4; i++){
    const button = document.createElement('button');
    button.id = `page${i}`;
    button.textContent = i;
    button.value = i;
    if(currentPage === parseInt(button.value)){
      button.className = 'button-active';
    }
    button.addEventListener('click', ()=>{
      currentPage = i;
      handlePageClick(currentPage, onClick);
    })
    ul.appendChild(button);
  }
  const nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage += 1;
      handlePageClick(currentPage, onClick)
    })
    nextButton.disabled = currentPage >= totalPages;
    ul.appendChild(nextButton);
  return ul;
}

async function handlePageClick(page, onClick) {
  const start = (page - 1) * itemsPerPage + 1;
  await onClick(start);
}

// function updatePaginationButtons() {
//   const prevBtn = document.getElementById('prevBtn');
//   console.log(prevBtn);
//   const nextBtn = document.getElementById('nextBtn');
//   prevBtn.disabled = currentPage === 1;
//   nextBtn.disabled = currentPage === totalPages;

//   for (let i = 1; i <= 5; i++) {
//     const pageBtn = document.getElementById(`page${i}`);
//     const pageNumber = currentPage + i - 3;
//     console.log(pageNumber)
//     const start = (pageNumber - 1) * itemsPerPage + 1;
//     pageBtn.textContent = pageNumber;
//     pageBtn.disabled = start < 1 || start > 1000;
//   }
// }

//----------------------------------------------------------------//
const createTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key in data) {
    let th = document.createElement("th");
    let text = formatData(key, 'Title');
    let titleText = document.createTextNode(text);
    th.appendChild(titleText);
    row.appendChild(th);
  }
}

const generateTable = (table, data) => {
  const values = ['cmcRank', 'm_cap', 'name', 'price', 'symbol', 'volume_7d', 'volume_24h'];
  const changes = ['change_7d', 'change_24h', 'v_change_24h']
  const tblBody = document.createElement("tbody");
  data.forEach(dataItem =>{
    const row = document.createElement("tr");
    Object.keys(dataItem).forEach(key =>{
      if(values.indexOf(key) >= 0){
        const name = document.createElement("td");
        const nameDiv = document.createElement("div");
        const nameText = document.createElement("p");
        const text = formatData(dataItem[key], key);
        nameText.innerText = (text);
        nameDiv.appendChild(nameText);
        name.appendChild(nameDiv);
        row.appendChild(name);
      }
      if(changes.indexOf(key) >= 0){
        const name = document.createElement("td");
        const nameDiv = document.createElement("div");
        const nameSpan = document.createElement("span");
        const icon = document.createElement("i");
        const textData = formatData(dataItem[key], key);
        dataItem[key] >= 0 ? nameSpan.classList.add("up"): nameSpan.classList.add("down");
        dataItem[key] >= 0 ? icon.className = "fa fa-caret-up up" : icon.className = "fa fa-caret-down down";
        nameDiv.appendChild(icon);
        nameSpan.innerText = (textData)
        nameDiv.appendChild(nameSpan);
        name.appendChild(nameDiv);
        row.appendChild(name);
      }
    })
    
    tblBody.appendChild(row)
  })
  table.appendChild(tblBody)
}
  

const createTable = (data) => {
  const table = document.createElement("table");
  generateTable(table, data);
  createTableHead(table, data[0]);
  return table;
};

async function fetchCurrencyListData(start) {
  try {
    data.currencyListData[start] = await getCurrencyList(start);
    localStorage.setItem('data', JSON.stringify(data));
    return data.currencyListData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function diluteListingData(data) {
  const {
      name:name,
      symbol:symbol,
      cmc_rank:cmcRank,
      quote:{
        USD:{
          price:price,
          market_cap: m_cap,
          percent_change_24h: change_24h,
          percent_change_7d: change_7d,
          volume_change_24h: v_change_24h,
          volume_24h: volume_24h,
          volume_7d: volume_7d
        }
      }    
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