import { formatData } from "../utils/formatData";

export const createTableComponent = (data) => {
    const table = document.createElement("table");
    generateTable(table, data);
    createTableHead(table, data[0]);
    return table;
  };

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
    const values = ['cmcRank', 'm_cap', 'name', 'price', 'symbol', 'volume_7d', 'volume_24h', 'tokens', 'volume', 'num'];
    const changes = ['change_7d', 'change_24h', 'v_change_24h', 'avg_p_change', 'm_cap_change', 'v_change']
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
    
  
  