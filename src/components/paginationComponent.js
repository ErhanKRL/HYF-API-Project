const itemsPerPage = 100;

let startPage;
let pageNumber

export const createPaginationComponent = (start, totalCount, onClick) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  if(start < 301){
    startPage = 1;
  } else {
    startPage = ((Math.floor(start / itemsPerPage)) + 1) - 2;
  }

  if(totalPages > 5){
    pageNumber = startPage + 4
  }else {
    pageNumber = totalPages
  }
  const ul = document.createElement('ul');
  ul.className = 'paginationList';
  const prevButton = document.createElement('button');
    prevButton.id = 'prevBtn';
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => {
      let currentPage = ((Math.floor(start / itemsPerPage)) + 1)
      currentPage --;
      handlePageClick(currentPage, onClick)
    })
    prevButton.disabled = start === 1;
    ul.appendChild(prevButton);
  for(let i = startPage; i <= pageNumber; i++){
    const button = document.createElement('button');
    button.id = `page${i}`;
    button.textContent = i;
    button.value = i;
    console.log(parseInt(button.value), ((Math.floor(start / itemsPerPage)) + 1))
    if(parseInt(button.value) === ((Math.floor(start / itemsPerPage)) + 1)){
      button.className = 'button-active'
    }
    button.addEventListener('click', (e)=>{
      handlePageClick(parseInt(e.target.value), onClick);
    })
    ul.appendChild(button);
  }
  const nextButton = document.createElement('button');
    nextButton.id = 'nextBtn';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      let currentPage = ((Math.floor(start / itemsPerPage)) + 1)
      currentPage ++;
      handlePageClick(currentPage, onClick)
    })
    nextButton.disabled = ((Math.floor(start / itemsPerPage)) + 1) >= totalPages;
    ul.appendChild(nextButton);
  return ul;
}

async function handlePageClick(page, onClick) {
  const start = (page - 1) * itemsPerPage + 1;
  await onClick(start);
}

