const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const url = BASE_URL + 'v1/global-metrics/quotes/latest?convert=USD';

export async function getGlobalMetrics() {
  console.log(API_KEY, BASE_URL);
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': API_KEY,
        "Accept": "*/*"
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const globalMetrics = await response.json();
    return globalMetrics;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// export function getGlobalMetrics(
//   let myHeaders = new Headers();
// myHeaders.append("X-CMC_PRO_API_KEY", "a107740d-e18a-428f-8890-de5bf46638e0");
// myHeaders.append("Accept", "*/*");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?convert=USD", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// )
