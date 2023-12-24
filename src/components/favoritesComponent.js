export const createFavoritesComponent = () => {
    const element = document.createElement('div');
    element.className = 'favorites-container';
    element.innerHTML = String.raw`
    <h2>This Is Favorites Component</h2>
    `;
    return element;
  };
  