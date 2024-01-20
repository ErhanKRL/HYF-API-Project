const itemsPerPage = 100;
let startPage = 1;
let currentPage = startPage;


export const createPaginationComponent = (totalCount, onClick) => {
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