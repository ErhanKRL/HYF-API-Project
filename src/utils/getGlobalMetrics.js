import { API_KEY, BASE_URL } from '../data';
const url = BASE_URL + 'v1/global-metrics/quotes/latest?convert=USD';

export async function getGlobalMetrics() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const globalMetrics = await response.json();
    return globalMetrics;
  } catch (error) {
    throw error;
  }
}
