export const createExchangesComponent = () => {
  const element = document.createElement('div');
  element.className = 'exchange-container';
  element.innerHTML = String.raw`
    <h2>This Is Exchanges Component</h2>
    `;
  return element;
};
