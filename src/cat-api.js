const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = "live_iVBzRuMyE3wFFvhBoWpGXlU9xUz4EHfq5NzyPO3H2lOfGkqV6IrLxH8cRzqdeN04";


export function fetchBreeds() {
  
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response =>
  {
    if (!response.ok) {
    throw new Error(response.status);
  }
    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
 
  return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

