export const createErrorComponent = (error) => {
  const element = document.createElement('div');
  element.className = 'error-component';
  const warning = document.createElement('h3');
  warning.textContent = 'ERROR !';
  element.appendChild(warning);
  const status = document.createElement('h1');
  status.textContent = error.message;
  let errorText = '';
  switch (error.message) {
    case '400':
      errorText = 'Invalid argument or input!';
      break;
    case '401':
      errorText = 'Unauthorized API Key!';
      break;
    case '404':
      errorText = 'Page not found!';
      break;
    case '429':
      errorText = 'API Key rate limit exceeded!';
      break;
    case '500':
      errorText = 'Something went wrong!';
      break;
    default:
      errorText = 'Something went wrong!';
      break;
  }
  element.appendChild(status);
  const definition = document.createElement('p');
  definition.textContent = errorText;
  element.appendChild(definition);
  return element;
};
