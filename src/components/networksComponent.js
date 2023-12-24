export const createNetworksComponent = () => {
    const element = document.createElement('div');
    element.className = 'networks-container';
    element.innerHTML = String.raw`
    <h2>This Is Networks Component</h2>
    `;
    return element;
  };
  