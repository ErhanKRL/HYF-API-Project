import { getGlobalMetrics } from '../utils/getGlobalMetrics';

export const createGlobalComponent = () => {
  const globalMetrics = getGlobalMetrics();
  console.log(globalMetrics);
  const element = document.createElement('div');
  element.className = 'global-container';
  element.innerHTML = String.raw`
    <h2>This Is Main Component</h2>
    `;
  return element;
};
