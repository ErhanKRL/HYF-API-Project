const API_KEY = Config.api_key;
const BASE_URL = Config.base_url
const url = BASE_URL+'v1/global-metrics/quotes/latest?convert=USD';

export async function getGlobalMetrics() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'X-CMC_PRO_API_KEY': API_KEY,
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
};