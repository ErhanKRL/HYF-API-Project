const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


export async function getCategories(start) {
    const url = BASE_URL + `v1/cryptocurrency/categories?start=${start}&limit=100`;
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
