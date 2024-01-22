import { API_KEY, BASE_URL } from "../data";

export async function getCurrencyList(start) {
  const url =
    BASE_URL +
    `v1/cryptocurrency/listings/latest?start=${start}&sort=market_cap&cryptocurrency_type=all&tag=all&limit=100&aux=num_market_pairs,cmc_rank,date_added,tags,platform,max_supply,circulating_supply,total_supply,market_cap_by_total_supply,volume_24h_reported,volume_7d,volume_7d_reported,volume_30d,volume_30d_reported,is_market_cap_included_in_calc`;
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
    const currencyList = await response.json();
    console.log('fetching currency', start);
    return currencyList;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
