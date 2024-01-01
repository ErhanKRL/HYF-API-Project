export const createInvestorsComponent = () => {
  const element = document.createElement('div');
  element.className = 'investors-container';
  element.innerHTML = String.raw`
    <h2>This Is Investors Component</h2>
    `;
  return element;
};
