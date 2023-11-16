import { select, loader } from "./index";

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_iVBzRuMyE3wFFvhBoWpGXlU9xUz4EHfq5NzyPO3H2lOfGkqV6IrLxH8cRzqdeN04";
const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  const endPoint = "/breeds";
  const url = BASE_URL + endPoint;
  loader.classList.remove("is-hidden");
  return fetch(url, options).then(response =>
  {
    if (!response.ok) {
    throw new Error(response.status);
  }
    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
  const endPoint = "/images/search";
  const params = `?breed_ids=${breedId}`;
  const url = BASE_URL + endPoint + params;
  
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

