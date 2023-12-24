export const createFiltersComponent = () => {
    const element = document.createElement('div');
    element.className = 'filters-container';
    element.innerHTML = String.raw`
    <h2>This Is Filters Component</h2>
    `;
    return element;
  };
  