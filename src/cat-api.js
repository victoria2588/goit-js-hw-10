const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_mST546NRuFNjFejVU3P1fkGgkq2jT3Ht6DP1X0mogGvUZ4G5sPrCPjYlEAkx0DKt';

function fetchBreeds() {
  const END_POINT = '/breeds';
  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}${END_POINT}?${PARAMS}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });

  return fetch(`${BASE_URL}${END_POINT}?${PARAMS}`).then(responce => {
    if (!responce.ok) {
      throw new Error(resp.statusText);
    }
    return responce.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
