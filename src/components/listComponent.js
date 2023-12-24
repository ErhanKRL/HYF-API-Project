export const createCurrencyListComponent = () => {
  const element = document.createElement('div');
  element.className = 'coin-list-container';
  element.innerHTML = String.raw`
  <h2>This Is List Component</h2>
  `;
  return element;
};
