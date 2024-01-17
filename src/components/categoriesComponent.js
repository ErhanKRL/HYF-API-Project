export const createCategoriesComponent = () => {
  const element = document.createElement('div');
  element.className = 'categories-container';
  element.innerHTML = String.raw`
    <h2>This Is Categories Component</h2>
    `;
  return element;
};
