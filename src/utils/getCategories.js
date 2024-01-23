import { API_KEY, BASE_URL } from '../data';

export async function getCategories(start) {
  const url =
    BASE_URL + `v1/cryptocurrency/categories?start=${start}&limit=100`;
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
    const categories = await response.json();
    console.log('fetched categories', start);
    return categories;
  } catch (error) {
    throw error;
  }
}
